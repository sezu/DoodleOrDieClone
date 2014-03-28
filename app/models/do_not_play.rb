# == Schema Information
#
# Table name: do_not_plays
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  chain_id   :integer
#  created_at :datetime
#  updated_at :datetime
#

class DoNotPlay < ActiveRecord::Base
  belongs_to :user
  belongs_to :chain
end
