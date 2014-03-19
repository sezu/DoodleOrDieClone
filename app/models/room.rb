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

  has_many :chains
end
