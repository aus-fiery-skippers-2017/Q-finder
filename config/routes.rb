Rails.application.routes.draw do

  devise_for :users, controllers: { omniauth_callbacks: 'omniauth_callbacks' }

	 root to: "homepages#index"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :places, only:[:show,:index] do
      resources :reviews
  end

end
