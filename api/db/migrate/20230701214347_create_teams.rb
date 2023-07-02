class CreateTeams < ActiveRecord::Migration[7.0]
  def change
    create_table :teams do |t|
      t.integer :points, default: 0
      t.integer :kind_team
      t.references :table
      t.timestamps
    end
  end
end
