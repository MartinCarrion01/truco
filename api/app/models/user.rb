class User < ApplicationRecord
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password, length: {in: 8..20}, if: -> { new_record? || password.present? }

    has_one_attached :avatar

    def avatar_url
        avatar.attached? ? Rails.application.routes.url_helpers.rails_blob_url(avatar, host: "http://127.0.0.1:3001") : ''
    end
end
