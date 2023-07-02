class TablesController < ApplicationController
  before_action :set_table, except: %i[create]
  before_action :admin?, only: %i[add_point remove_point]
  before_action :playing?, only: %i[join]
  before_action :are_teams_full?, only: %i[deal_cards]

  def create
    table = Table.create!(current_user: @current_user, game_type: params[:game_type])
    render(json: { table: table.serialize_json }, status: :created)
  end

  def join
    @table.join_user(@current_user)
    render(json: { table: @table.serialize_json }, status: :ok)
  end

  def sit
    @table.sit(@current_user, params[:position])
    render(status: :ok)
  end

  def deal_cards
    @table.deal_cards
    render(status: :ok)
  end

  def my_hand
    hand = @table.joined_users.find_by(user_id: @current_user.id).hand
    render(json: { hand: }, status: :ok)
  end

  def play_card
    @table.play_card(@current_user, params[:card])
    render(status: :ok)
  end

  def add_point
    @table.add_point(params[:kind_team])
    render(status: :ok)
  end

  def remove_point
    @table.remove_point(params[:kind_team])
    render(status: :ok)
  end

  def forfeit
    @table.forfeit(@current_user)
    render(status: :ok)
  end

  def show_hand
    @table.show_hand(@current_user)
    render(status: :ok)
  end

  def hand
    user = @table.joined_users.includes(:user).where(user: { username: params[:joined_user_username] }).first
    raise "#{user.username} no ha permitido enseñar sus cartas" unless user.is_showing_hand

    render(json: { hand: user.hand }, status: :ok)
  end

  def close_table
    @table.close
    render(status: :ok)
  end

  def leave_table
    @table.leave(@current_user)
    render(status: :ok)
  end

  private

  def set_table
    @table = Table.find_by(table_number: params[:id])
    raise ActiveRecord::RecordNotFound, 'La mesa seleccionada no existe' if @table.blank?
  end

  def admin?
    return if @current_user.admin?(@table)

    raise StandardError, 'Para realizar esta accion, debe ser el creador de la mesa'
  end

  def playing?
    return unless @current_user.is_playing?

    raise StandardError, 'No puede realizar esta acción, ya que usted se encuentra en partida'
  end

  def are_teams_full?
    @table.teams.each do |team|
      case @table.game_type.to_sym
      when :singles
        raise 'La partida no puede comenzar si no estan todos sentados' unless team.joined_users.present?
      when :doubles
        raise 'La partida no puede comenzar si no estan todos sentados' unless team.joined_users.size == 2
      end
    end
  end
end
