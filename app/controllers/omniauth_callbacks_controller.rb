class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  # def google_oauth2
  def sign_in_with(provider_name)
  
    @user = User.from_omniauth(request.env["omniauth.auth"])
    # binding.pry
    sign_in_and_redirect @user, :event => :authentication
    set_flash_message(:notice, :success, :kind => provider_name) if is_navigational_format?
  else
    redirect_to new_user_registration_path
  end


  def facebook
    sign_in_with "Facebook"
  end

  def google_oauth2
    sign_in_with "Google"
  end

end

