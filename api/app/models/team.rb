class Team < ApplicationRecord
  enum kind_team: {
    diagonal: 0,
    anti_diagonal: 1
  }

  belongs_to :table
  has_many :joined_users, autosave: true
  has_many :users, through: :joined_users

  def usernames
    usernames = []
    users.each do |user|
      usernames << user.username
    end
    usernames
  end
end
