class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.string :name, :null => false
      t.text :description
      t.boolean :is_public, :null => false

      t.timestamps
    end

    add_index :rooms, :name, :unique => :true
  end
end
