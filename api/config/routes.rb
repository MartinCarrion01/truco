Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  mount ActionCable.server => "/cable"

  resources :users, only: %i[create] do
    collection do
      get :current
      put :upload_avatar
      patch :upload_avatar
    end
  end
  
  resources :auth, only: %i[] do
    collection do
      post :login
    end
  end

  resources :tables, only: %i[create] do
    member do
      patch :join
      put :join
      patch :sit
      put :sit
    end
  end
end
