# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)      not null
#  email           :string(255)
#  password_digest :string(255)      not null
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  attr_reader :password, :password2

  validate :passwords_match
  validates :username, :presence => true
  validates :password, :length => { :minimum => 6, :allow_nil => true }
  validates :password_digest, :presence => { :message => "Password can't be blank" }

  has_many :sessions
  has_many :steps

  def password2=(confirmation_password)
    @password2 = confirmation_password
  end

  def password=(unencrypted_password)
    @password = unencrypted_password
    self.password_digest = BCrypt::Password.create(unencrypted_password)
  end

  def is_password?(unencrypted_password)
    BCrypt::Password.new(self.password_digest).is_password?(unencrypted_password)
  end

  def self.find_by_credentials(identifer, password)
    user = User.find_by_username(identifer)
    user = User.find_by_email(identifer) unless user
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  private

  def passwords_match
    errors.add(:password, "mismatch") unless self.password == self.password2
  end
end