class User < ApplicationRecord
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password, length: {in: 8..20}, if: -> { new_record? || password.present? }

    has_one_attached :avatar

    has_many :joined_users
    has_many :tables, through: :joined_users

    after_commit :set_default_avatar, on: %i[create]

    def avatar_url
        avatar.attached? ? Rails.application.routes.url_helpers.rails_blob_url(avatar, host: "http://127.0.0.1:3001") : ''
    end

    private
    def set_default_avatar
        unless avatar.attached?
            avatar.attach(
                io: File.open(
                    Rails.root.join(
                        'app', 'assets', 'images', 'default_avatar.png'
                    )
                ), filename: 'default_avatar.png',
                content_type: 'image/png'
            )
        end
    end
end
