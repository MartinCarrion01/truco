class User < ApplicationRecord
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password, length: {in: 8..20}, if: -> { new_record? || password.present? }

    has_one_attached :avatar

    before_update :update_avatar, if: -> { avatar.present? }

    def avatar_url
        avatar.attached? ? Rails.application.routes.url_helpers.rails_blob_url(image, host: "http://127.0.0.1:3000") : ''
    end

    def update_avatar
        avatar.purge if avatar.attached?
        avatar.attach(avatar)
    end
end
