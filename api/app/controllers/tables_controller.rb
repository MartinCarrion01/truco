class TablesController < ApplicationController
    before_action :set_table, except: %i[create]
    before_action :is_admin?, only: %i[add_point remove_point]

    def create
        table = Table.create!(current_user: @current_user)
        render(json: {table: table.serialize_json}, status: :created)
    end

    def join
        @table.join_user(@current_user)
        render(json: {table: @table.serialize_json}, status: :ok)
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
        render(json: {hand: hand}, status: :ok)
    end

    def play_card
        @table.play_card(@current_user, params[:card])
        render(status: :ok)
    end

    def add_point
        @table.add_point(params[:username])
        render(status: :ok)
    end

    def remove_point
        @table.remove_point(params[:username])
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
        user = @table.joined_users.includes(:user).where(user: {username: params[:joined_user_username]}).first
        unless user.is_showing_hand
            raise StandardError.new "#{user.username} no ha permitido enseñar sus cartas"
        end
        render(json: {hand: user.hand}, status: :ok)
    end

    private
    def set_table
        @table = Table.find_by(table_number: params[:id])
        if @table.nil?
            raise ActiveRecord::RecordNotFound.new("La mesa seleccionada no existe")
        end
    end

    def is_admin?
        raise StandardError.new "Para realizar esta accion, debe ser el creador de la mesa" unless @current_user.is_admin?(@table)
    end
end
