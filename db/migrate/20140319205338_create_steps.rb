class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
      t.integer :user_id
      t.integer :chain_id

      t.text :description
      t.string :url

      t.timestamps
    end

    add_index :steps, :user_id
    add_index :steps, :chain_id
  end
end
