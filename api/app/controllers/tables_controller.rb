class TablesController < ApplicationController
    before_action :set_table, only: %i[join sit]

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

    private
    def set_table
        @table = Table.find_by(table_number: params[:id])
        if @table.nil?
            raise ActiveRecord::RecordNotFound.new("La mesa seleccionada no existe")
        end
    end
end
