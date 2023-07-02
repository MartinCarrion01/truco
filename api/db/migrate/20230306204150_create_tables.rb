class CreateTables < ActiveRecord::Migration[7.0]
  def change
    create_table :tables do |t|
      t.integer :table_number
      t.integer :status, default: 0
      t.integer :game_type
      t.integer :dealer, default: 1
      t.text :deck, default: [], array: true
      t.timestamps
    end
  end
end
