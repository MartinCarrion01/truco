class CreateJoinedUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :joined_users do |t|
      t.integer :position, default: 0
      t.integer :role, default: 1
      t.text :hand, default: [], array: true
      t.text :played_cards, default: [], array: true
      t.boolean :is_showing_hand, default: false
      t.references :user
      t.references :table
      t.references :team
      t.timestamps
    end
  end
end
