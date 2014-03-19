# == Schema Information
#
# Table name: sessions
#
#  id            :integer          not null, primary key
#  user_id       :integer          not null
#  session_token :string(255)      not null
#  created_at    :datetime
#  updated_at    :datetime
#

class Session < ActiveRecord::Base
  validates :user_id, :session_token, :presence => true

  belongs_to :user

  def remove_session(session_token)
    Session.find_by_session_token(session_token).destroy
  end

  def self.add_session(user, session_token)
    Session.create!(:user_id => user.id, :session_token => session_token)
  end
end
