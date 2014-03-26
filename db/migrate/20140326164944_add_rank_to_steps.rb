class AddRankToSteps < ActiveRecord::Migration
  def change
    add_column :steps, :rank, :integer
  end
end
