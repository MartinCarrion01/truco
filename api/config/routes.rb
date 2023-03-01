Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
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
end
