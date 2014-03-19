class CreateChains < ActiveRecord::Migration
  def change
    create_table :chains do |t|
      t.integer :room_id, :null => false
      t.integer :skip_counter, :default => 0
      t.boolean :is_completed, :default => false

      t.timestamps
    end

    add_index :chains, :room_id
  end
end
