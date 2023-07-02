class UsersController < ApplicationController
  skip_before_action :authenticate_user, only: %i[create]

  def create
    user = User.create!(user_params)
    render(json: { user: }, status: :created)
  end

  def current
    render(json: { user: current_user_as_json }, status: :ok)
  end

  def current_table
    unless @current_user.is_playing?
      render(status: :no_content)
      return
    end

    table = Table.includes(:joined_users)
                 .where.not(status: :closed)
                 .where(joined_users: { user_id: @current_user.id }).first
    raise ActiveRecord::RecordNotFound, 'No hay mesas, error fatal' if table.blank?

    render(json: { table: table.serialize_json }, status: :ok)
  end

  def update
    @current_user.update!(username: params[:username])
    render(status: :ok)
  end

  def upload_avatar
    @current_user.avatar.purge if @current_user.avatar.attached?
    @current_user.avatar.attach(params[:avatar])
    if @current_user.save
      render(json: { message: 'Foto de perfil establecida correctamente' }, status: :ok)
    else
      render(json: { message: @current_user.errors }, status: :unprocessable_entity)
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end

  def current_user_as_json
    @current_user.as_json(only: %i[username is_playing], methods: :avatar_url)
  end
end
