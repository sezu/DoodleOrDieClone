module SessionsHelper
  def current_user
    return nil unless session[:session_token]
    user_session = Session.find_by_session_token(session[:session_token])
    @current_user ||= User.find(user_session.user_id)
  end

  def logged_in?
    !!current_user
  end

  def login!(user)
    session[:session_token] = generate_unique_session_token
    Session.add_session(user, session[:session_token])
  end

  def logout!
    if logged_in?
      Session.find_by_session_token(session[:session_token]).destroy
      session[:session_token] = nil
    end
  end

  private

  def generate_unique_session_token
    token = SecureRandom::urlsafe_base64(16)

    while Session.find_by_session_token(token)
      token = SecureRandom::urlsafe_base64(16)
    end

    token
  end
end
