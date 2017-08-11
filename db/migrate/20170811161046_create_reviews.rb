class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.integer :rating
      t.string :review
      t.references :user, foreign_key: true
      t.references :place, foreign_key: true

      t.timestamps
    end
  end
end
