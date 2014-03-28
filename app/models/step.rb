# == Schema Information
#
# Table name: steps
#
#  id                     :integer          not null, primary key
#  user_id                :integer
#  chain_id               :integer
#  description            :text
#  image                  :text
#  created_at             :datetime
#  updated_at             :datetime
#  rank                   :integer
#  aws_image_file_name    :string(255)
#  aws_image_content_type :string(255)
#  aws_image_file_size    :integer
#  aws_image_updated_at   :datetime
#

class Step < ActiveRecord::Base
  validates :user_id, :chain, :presence => true

  belongs_to :user
  belongs_to :chain

  has_attached_file :aws_image, :styles => {
    :normal => "600x400",
    :preview => "300x200>",
    :timeline => "100x66#"
  }

  validates_attachment_content_type :aws_image, :content_type => /\Aimage\/.*\Z/
end
