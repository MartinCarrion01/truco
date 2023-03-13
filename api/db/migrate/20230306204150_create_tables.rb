class CreateTables < ActiveRecord::Migration[7.0]
  def change
    create_table :tables do |t|
      t.integer :table_number
      t.text :deck, default: [], array: true
      t.timestamps
    end
  end
end
