class CreateJoinedUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :joined_users do |t|
      t.integer :position, default: 0
      t.text :hand, default: [], array: true
      t.references :user
      t.references :table
      t.timestamps
    end
  end
end
