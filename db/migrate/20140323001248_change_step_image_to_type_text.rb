class ChangeStepImageToTypeText < ActiveRecord::Migration
  def change
    change_column :steps, :image, :text
  end
end
