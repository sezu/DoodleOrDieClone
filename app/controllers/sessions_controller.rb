class SessionsController < ApplicationController
  def new
    render "new"
  end

  def create
    @user = User.find_by_credentials(identifer, password)

    if @user
      login!(@user)
      redirect_to new_session_url
    else
      flash.now[:errors] = "Invalid login!"
      render "new"
    end
  end

  def destroy
    logout!
    redirect_to root_url
  end

  private

  def identifer
    params.require(:user).permit(:identifier).values.first
  end

  def password
    params.require(:user).permit(:password).values.first
  end
end
