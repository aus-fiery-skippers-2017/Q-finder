class Place < ApplicationRecord

  has_many :reviews

  validates :name, presence:true
  validates :map_id, presence:true, uniqueness:true
  def update_reviews
    sum = 0
    self.reviews.each do |review|
      sum += review.rating
    end
    self.rating = sum / self.reviews.length
    self.save
  end
end
