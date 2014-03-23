class ChangeUrLcolumnNameToSketch < ActiveRecord::Migration
  def change
    rename_column :steps, :url, :image
  end
end
