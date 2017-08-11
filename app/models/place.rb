class Place < ApplicationRecord

  has_many :reviews

  validates :name, presence:true
  validates :map_id, presence:true, uniqueness:true
end
