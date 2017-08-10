class CreatePlaces < ActiveRecord::Migration[5.1]
  def change
    create_table :places do |t|
      t.string :map_id
      t.string :name
      t.integer :rating

      t.timestamps
    end
  end
end
