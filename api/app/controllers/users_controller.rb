class UsersController < ApplicationController
    skip_before_action :authenticate_user, only: %i[create]
    
    def create
        user = User.create!(user_params)
        render(json: {user: user}, status: :created)
    end

    def current
        render(json: {user: @current_user}, status: :ok)
    end

    def upload_avatar
        @current_user.avatar.purge if @current_user.avatar.attached?
        @current_user.avatar.attach(params[:avatar])
        if @current_user.save
            render(json: { message: "Foto de perfil establecida correctamente" }, status: :ok)
        else
            render(json: { message: @current_user.errors }, status: :unprocessable_entity)
        end
    end

    private
    def user_params
        params.require(:user).permit(:username,
            :password,
            :password_confirmation)
    end
end
