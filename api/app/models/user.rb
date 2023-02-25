class User < ApplicationRecord
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password, length: {in: 8..20}, if: -> { new_record? || password.present? }
    validates :first_name, presence: true
    validates :last_name, presence: true

    has_one_attached :avatar

    def avatar_url
        avatar.attached? ? Rails.application.routes.url_helpers.rails_blob_url(image, host: "http://127.0.0.1:3000") : ''
    end
end
