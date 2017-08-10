class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  skip_before_action :verify_authenticity_token

  def sign_in_with(provider_name)
    @user = User.from_omniauth(request.env["omniauth.auth"])
    # if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication
      set_flash_message(:notice, :success, :kind => provider_name) if is_navigational_format?
    # else
    #   if provider_name == 'Google'
    #     session['devise.google_data'] = request.env['omniauth.auth'].except(:extra)
    #   elsif provider_name == 'Facebook'
    #     session["devise.facebook_data"] = request.env["omniauth.auth"].except(:extra)
    #   end
    #  redirect_to new_user_registration_url
    # end
  end

  def facebook
    sign_in_with "Facebook"
  end

  def google_oauth2
    sign_in_with "Google"
  end

end

