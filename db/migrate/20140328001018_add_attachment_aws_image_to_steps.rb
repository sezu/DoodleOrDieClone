class AddAttachmentAwsImageToSteps < ActiveRecord::Migration
  def self.up
    change_table :steps do |t|
      t.attachment :aws_image
    end
  end

  def self.down
    drop_attached_file :steps, :aws_image
  end
end
