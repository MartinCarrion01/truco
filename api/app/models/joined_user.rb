class JoinedUser < ApplicationRecord
  belongs_to :user
  belongs_to :table

  enum role: {
    admin: 0,
    player: 1
  }

  validate :validate_position_value, on: %i[update]

  def username
    user.username
  end

  def avatar_url
    user.avatar_url
  end

  def hand_length
    hand.length
  end

  private

  def validate_position_value
    errors.add(:position, 'La posición en la mesa solo puede variar de 0 a 4') unless (0..4).include?(position)
  end
end
