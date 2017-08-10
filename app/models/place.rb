class Place < ApplicationRecord

  validates :name, presence:true
  validates :map_id, presence:true, uniqueness:true
end
