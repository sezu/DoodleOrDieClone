class AddIsAssignedColumnToChain < ActiveRecord::Migration
  def change
    add_column :chains, :is_assigned, :boolean, default: false
  end
end
