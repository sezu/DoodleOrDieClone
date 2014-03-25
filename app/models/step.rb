# == Schema Information
#
# Table name: steps
#
#  id          :integer          not null, primary key
#  user_id     :integer
#  chain_id    :integer
#  description :text
#  image       :text
#  created_at  :datetime
#  updated_at  :datetime
#

class Step < ActiveRecord::Base
  validates :user_id, :chain, :presence => true

  belongs_to :user
  belongs_to :chain
end
