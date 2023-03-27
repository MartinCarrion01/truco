class JoinedUser < ApplicationRecord
    belongs_to :user
    belongs_to :table

    validates :points, numericality: { greater_than_or_equal_to: 0 }
    validate :validate_position_value, on: %i[update] 

    def username
        self.user.username
    end

    def avatar_url
        self.user.avatar_url
    end

    def hand_length
        self.hand.length
    end

    private
    def validate_position_value
        unless (0..4).include? self.position
            errors.add(:position, "La posición en la mesa solo puede variar de 0 a 4")
        end
    end
end
