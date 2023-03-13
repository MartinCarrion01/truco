class Table < ApplicationRecord
    attr_accessor :current_user

    before_create :set_table_number
    before_create :set_first_joined_user

    has_many :joined_users
    has_many :users, through: :joined_users

    class JoiningError < StandardError; end

    def serialize_json
        as_json(only: %i[table_number],
                include: {joined_users: {only: %i[id position],
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
        joined_user = self.joined_users.find_by(user_id: user.id)
        if joined_user.nil?
            raise ActiveRecord::RecordNotFound.new("El usuario no pertenece a esta partida")
        else
            joined_user.position = position
            save!
            ActionCable.server.broadcast("table_#{self.table_number}", { type: "user_sit", message: "#{user.username} se ha sentado en la posición #{position}", table: self.serialize_json })
        end
    end

    private
    def set_table_number
        self.table_number = rand(100000..999999)
    end

    def set_first_joined_user
        self.joined_users.build(user: self.current_user)
    end
end
