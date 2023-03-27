class Table < ApplicationRecord
    attr_accessor :current_user

    enum :game_type, %i[singles doubles]
    enum :status, %i[waiting playing finished closed]

    before_create :set_table_number
    before_create :set_first_joined_user

    after_create :queue_initialize_deck

    has_many :joined_users, autosave: true
    has_many :users, through: :joined_users

    class JoiningError < StandardError; end

    def serialize_json
        as_json(only: %i[table_number],
                include: {joined_users: {only: %i[id position played_cards points is_admin is_showing_hand],
                            methods: %i[hand_length username avatar_url]}})
    end

    def join_user(user)
        self.users << user
        if self.save!
            ActionCable.server.broadcast("table_#{self.table_number}", { type: "user_join", message: "#{user.username} se ha unido a la mesa", table: self.serialize_json })
        else
            raise JoiningError.new "Error"
        end
    end

    def sit(user, position)
        joined_user = joined_users.find_by(user_id: user.id)
        if joined_user.nil?
            raise ActiveRecord::RecordNotFound.new("El usuario no pertenece a esta partida")
        else
            joined_user.position = position
            joined_user.save!
            save!
            ActionCable.server.broadcast("table_#{self.table_number}", { type: "user_sit", message: "#{user.username} se ha sentado en la posición #{position}", table: self.serialize_json })
        end
    end

    def deal_cards
        deck.shuffle!
        (1..3).each do |i|
            joined_users.each do |user|
                user.hand.push(deck.pop) 
            end
        end
        save!
        ActionCable.server.broadcast("table_#{self.table_number}", { type: "cards_dealt", message: "Se repartieron todas las cartas", table: self.serialize_json })
    end

    def play_card(user, card)
        joined_user = joined_users.find_by(user_id: user.id)
        if joined_user.nil?
            raise ActiveRecord::RecordNotFound.new("El usuario no pertenece a esta partida")
        end
        joined_user.played_cards.push(card)
        joined_user.hand.delete(card)
        joined_user.save!
        save!
        ActionCable.server.broadcast("table_#{self.table_number}", { type: "card_played", message: "#{user.username} jugo una carta", table: self.serialize_json })
    end

    def add_point(username)
        joined_user = joined_users.includes(:user).find_by(user: {username: username})
        if joined_user.nil?
            raise ActiveRecord::RecordNotFound.new("El usuario no pertenece a esta partida")
        end
        joined_user.points += 1
        joined_user.save!
        broadcast_table("point_added", "A #{username} le fue sumado un punto")
    end

    def remove_point(username)
        joined_user = joined_users.includes(:user).find_by(user: {username: username})
        if joined_user.nil?
            raise ActiveRecord::RecordNotFound.new("El usuario no pertenece a esta partida")
        end
        joined_user.points -= 1
        joined_user.save!
        broadcast_table("point_removed", "A #{username} le fue restado un punto")
    end

    def forfeit(user)
        joined_user = joined_users.find_by(user_id: user.id)
        if joined_user.nil?
            raise ActiveRecord::RecordNotFound.new("El usuario no pertenece a esta partida")
        end
        joined_user.hand = []
        joined_user.save!
        broadcast_table("forfeit", "¡#{user.username} se fue al mazo!")
    end

    def show_hand(user)
        joined_user = joined_users.find_by(user_id: user.id)
        if joined_user.nil?
            raise ActiveRecord::RecordNotFound.new("El usuario no pertenece a esta partida")
        end
        joined_user.is_showing_hand = true
        joined_user.save!
        broadcast_table("show_hand", "¡#{user.username} muestra su mano!")
    end

    private
    def set_table_number
        self.table_number = rand(100000..999999)
    end

    def set_first_joined_user
        self.joined_users.build(user: self.current_user, is_admin: true)
    end

    def queue_initialize_deck
        InitializeDeckJob.perform_now(id)
    end

    def broadcast_table(type, message)
        ActionCable.server.broadcast("table_#{self.table_number}", { type: type, message: message, table: self.serialize_json })
    end
end
