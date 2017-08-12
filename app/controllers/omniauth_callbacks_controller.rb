class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  skip_before_action :verify_authenticity_token

  def sign_in_with(provider_name)
    # @user = User.from_omniauth(request.env["omniauth.auth"])
    binding.pry
    sign_in_and_redirect current_user, :event => :authentication
    set_flash_message(:notice, :success, :kind => provider_name) if is_navigational_format?
  end


  def facebook
    sign_in_with "Facebook"
  end

  def google_oauth2
    sign_in_with "Google"
  end

end

