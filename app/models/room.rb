# == Schema Information
#
# Table name: rooms
#
#  id          :integer          not null, primary key
#  name        :string(255)      not null
#  description :text
#  is_public   :boolean          not null
#  created_at  :datetime
#  updated_at  :datetime
#

class Room < ActiveRecord::Base
  validates :name, :is_public, :presence => true

  has_many :chains, :dependent => :destroy
  has_many :steps, :through => :chains, :source => :steps

  def find_valid_chain(user_id)
    invalid_chains = self.chains
        .joins(:do_not_plays)
        .where("do_not_plays.user_id = #{user_id}")

    self.chains.where(:is_completed => false, :is_assigned => false) - invalid_chains
  end
end
