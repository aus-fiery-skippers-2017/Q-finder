class Review < ApplicationRecord
  belongs_to :user
  belongs_to :place
  def user_email
     User.find_by_id(self.user_id).email
  end
end
