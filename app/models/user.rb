class User < ApplicationRecord

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  devise :omniauthable, omniauth_providers: [:google_oauth2, :facebook]

   def self.from_omniauth(auth)
    # binding.pry
    if auth.provider == 'facebook'
        where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
         user.email = auth.info.email
        end
    elsif auth.provider == 'google_oauth2'
          user = User.find_by(email: auth.info.email)
          unless user
          user = User.create(
             email: auth.info.email,
             uid: auth.uid,
             provider: auth.provider,
             password: Devise.friendly_token[0,20],
             picture_url: auth.extra.raw_info.picture
          )
        end
     end
  end

 # def self.from_omniauth(auth)
 #    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
 #       user.email = auth.info.email
 #     end
 # end

 # def self.from_omniauth(access_token)
 #    data = access_token.info
 #    user = User.find_by(email: data['email'])
 #    # binding.pry
 #    # Uncomment the section below if you want users to be created if they don't exist
 #    unless user
 #        user = User.create(
 #           email: data['email'],
 #           uid: access_token.uid,
 #           provider: access_token.provider,
 #           password: Devise.friendly_token[0,20],
 #           picture_url: access_token.extra.raw_info.picture
 #        )

 #    end
 #  end
end
