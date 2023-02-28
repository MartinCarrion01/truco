class UsersController < ApplicationController
    skip_before_action :authenticate_user, only: %i[create]
    
    def create
        user = User.create!(user_params)
        render(json: {user: user}, status: :created)
    end

    private
    def user_params
        params.require(:user).permit(:username,
            :password,
            :password_confirmation,
            :avatar)
    end
end
