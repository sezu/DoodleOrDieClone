# == Schema Information
#
# Table name: chains
#
#  id           :integer          not null, primary key
#  room_id      :integer          not null
#  skip_counter :integer          default(0)
#  is_completed :boolean          default(FALSE)
#  created_at   :datetime
#  updated_at   :datetime
#

class Chain < ActiveRecord::Base
  validates :room_id, :presence => true;

  belongs_to :room
  has_many :steps
end
