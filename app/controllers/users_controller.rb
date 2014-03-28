class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def show
    #returns all chains for a particular user
    #helper method to select last few steps
    @user = User.find(params[:id])
    render json: @user
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      redirect_to "#/rooms/1"
    else
      flash.now[:errors] = @user.errors.full_messages
      p @user.errors.full_messages
      render "new"
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password2)
  end
end

