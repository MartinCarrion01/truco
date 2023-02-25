class UsersController < ApplicationController
    skip_before_action :authenticate_user, only: %i[create]
    
    def create
        user = User.create!(user_params)
        render(json: {user: user}, status: :created)
    end

    def set_avatar
        @current_user.avatar.purge if @current_user.avatar.attached?
        @current_user.avatar.attach(params[:avatar])
        @current_user.save!
        render(json: {message: "Su avatar ha sido actualizado correctamente"}, status: :ok)
    end

    private
    def user_params
        params.require(:user).permit(:username,
            :password,
            :password_confirmation,
            :first_name,
            :last_name)
    end
end
