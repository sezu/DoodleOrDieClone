class CreateDoNotPlays < ActiveRecord::Migration
  def change
    create_table :do_not_plays do |t|
      t.integer :user_id
      t.integer :chain_id

      t.timestamps
    end

    add_index :do_not_plays, :user_id
    add_index :do_not_plays, :chain_id
  end
end
