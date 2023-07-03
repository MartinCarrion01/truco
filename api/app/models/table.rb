class Table < ApplicationRecord
  attr_accessor :current_user

  enum :game_type, %i[singles doubles]
  enum :status, %i[waiting_players waiting playing finished closed]

  before_create :set_table_number
  before_create :set_first_joined_user
  before_create :create_teams

  has_many :teams, autosave: true
  has_many :joined_users, autosave: true
  has_many :users, through: :joined_users

  def serialize_json
    as_json(only: %i[table_number status game_type dealer],
            include: { joined_users: {  only: %i[id position played_cards role is_showing_hand],
                                        methods: %i[hand_length username avatar_url] },
                       teams: { only: %i[id points kind_team], methods: %i[usernames] } })
  end

  def join_user(user)
    case game_type.to_sym
    when :singles
      raise 'La mesa esta completa' if joined_users.size == 2
    when :doubles
      raise 'La mesa esta completa' if joined_users.size == 4
    end

    users << user
    user.is_playing = true
    user.save!
    save!
    broadcast_table('user_join', "#{user.username} se ha unido a la mesa")
  end

  def sit(user, position)
    joined_user = joined_users.find_by(user_id: user.id)
    raise ActiveRecord::RecordNotFound, 'El usuario no pertenece a esta partida' if joined_user.nil?

    joined_user.position = position
    teams.each { |team| team.joined_users.delete(joined_user) }
    send("join_team_#{game_type}", joined_user)
    self.status = :waiting if send("check_team_#{game_type}_full")
    save!
    broadcast_table('user_sit', "#{user.username} se ha sentado en la posición #{position}")
  end

  def deal_cards
    initialize_deck
    deck.shuffle!

    3.times do
      joined_users.each do |user|
        user.hand.push(deck.pop)
      end
    end

    send("change_dealer_#{game_type}")
    self.status = :playing

    save!
    broadcast_table('cards_dealt', 'Se repartieron las cartas')
  end

  def play_card(user, card)
    joined_user = joined_users.find_by(user_id: user.id)
    raise ActiveRecord::RecordNotFound, 'El usuario no pertence a esta partida' if joined_user.nil?

    joined_user.played_cards.push(card)
    joined_user.hand.delete(card)
    joined_user.save!

    self.status = :finished if joined_users.all? { |user| user.hand.empty? }
    save!
    broadcast_table('card_played', "#{user.username} jugo una carta")
  end

  def add_point(kind_team)
    team = teams.send(kind_team).first
    team.points += 1
    team.save!
    broadcast_table('point_added', 'Se sumó un punto')
  end

  def remove_point(kind_team)
    team = teams.send(kind_team).first
    team.points -= 1
    team.save!
    broadcast_table('point_removed', 'Se restó un punto')
  end

  def forfeit(user)
    joined_user = joined_users.find_by(user_id: user.id)
    raise ActiveRecord::RecordNotFound, 'El usuario no pertenece a esta partida' if joined_user.nil?

    joined_user.hand = []
    self.status = :finished
    save!
    broadcast_table('forfeit', "¡#{user.username} se fue al mazo!")
  end

  def show_hand(user)
    joined_user = joined_users.find_by(user_id: user.id)
    raise ActiveRecord::RecordNotFound, 'El usuario no pertenece a esta partida' if joined_user.blank?

    joined_user.is_showing_hand = true
    self.status = :finished unless finished?
    joined_user.save!
    save!
    broadcast_table('show_hand', "¡#{user.username} muestra su mano!")
  end

  def close
    users.each do |user|
      user.is_playing = false
      user.save!
    end

    teams.each do |team|
      team.joined_users.delete_all
      team.save!
    end

    teams.delete_all
    joined_users.delete_all
    self.status = :closed
    save!
    broadcast_table('table_closed')
  end

  # NO FUNCIONA EL AUTOSAVE POR ESO TENGO QUE HACER UN SAVE CON TODAS LAS ENTIDADES QUE TOCO ACA
  def leave(user)
    joined_user = joined_users.find_by(user_id: user.id)
    raise ActiveRecord::RecordNotFound, 'El usuario no pertenece a esta partida' if joined_user.blank?

    joined_users.delete(joined_user)
    teams.each do |team|
      team.joined_users.delete(joined_user)
      team.save!
    end

    user.is_playing = false
    user.save!

    remaining_user = joined_users.first
    if remaining_user.present? && remaining_user.admin?
      self.status = :waiting_players
      initialize_deck
    elsif remaining_user.present? && remaining_user.player? && joined_user.admin?
      self.status = :waiting_players
      remaining_user.role = :admin
      remaining_user.save!
      initialize_deck
    else
      self.status = :closed
    end

    save!

    broadcast_table('user_left', "¡#{user.username} abandonó la partida")
  end

  private

  def join_team_singles(joined_user)
    case joined_user.position
    when 1
      teams.diagonal.first.joined_users << joined_user
    when 2
      teams.anti_diagonal.first.joined_users << joined_user
    end
  end

  def join_team_doubles(joined_user)
    case joined_user.position
    when 1, 4
      teams.diagonal.first.joined_users << joined_user
    when 2, 3
      teams.anti_diagonal.first.joined_users << joined_user
    end
  end

  def set_table_number
    self.table_number = rand(100_000..999_999)
  end

  def set_first_joined_user
    joined_users.build(user: current_user, role: :admin)
    current_user.is_playing = true
    current_user.save!
  end

  def create_teams
    %i[diagonal anti_diagonal].each do |team|
      teams.build(kind_team: team)
    end
  end

  def initialize_deck
    self.deck = []

    %w[b c e o].each do |i|
      (1..10).each do |j|
        deck.push("#{i}#{j}")
      end
    end

    joined_users.each do |user|
      user.hand = []
      user.played_cards = []
      user.is_showing_hand = false
    end
  end

  def check_team_singles_full
    teams.each do |team|
      return false unless team.joined_users.size == 1
    end
    true
  end

  def check_team_doubles_full
    teams.each do |team|
      return false unless team.joined_users.size == 2
    end
    true
  end

  def change_dealer_singles
    if dealer == 1
      self.dealer = 2
    else
      self.dealer -= 1
    end
  end

  def change_dealer_doubles
    if dealer == 1
      self.dealer = 4
    else
      self.dealer -= 1
    end
  end

  def broadcast_table(type, message = '')
    ActionCable.server.broadcast("table_#{table_number}", { type:, message:, table: serialize_json })
  end
end
