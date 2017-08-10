Rails.application.routes.draw do
  get 'places/show'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :places, only:[:show,:index]

end
