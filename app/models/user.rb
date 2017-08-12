class User < ApplicationRecord

  has_many :reviews

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  devise :omniauthable, omniauth_providers: [:google_oauth2, :facebook]

   def self.from_omniauth(auth)
    # if auth.provider == 'facebook'
        where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
         user.email = auth.info.email
         user.picture_url = auth.extra.raw_info.picture

        end

    # elsif auth.provider == 'google_oauth2'
          # user = User.find_by(email: auth.info.email)
          # unless user
          # user = User.create(
          #    email: auth.info.email,
          #    uid: auth.uid,
          #    provider: auth.provider,
          #    password: Devise.friendly_token[0,20],
          #    picture_url: auth.extra.raw_info.picture
          #    )
          # end
          # user
  end
end
