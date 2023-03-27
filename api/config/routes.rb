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
      patch :add_point
      put :add_point
      patch :deal_cards
      put :deal_cards
      patch :forfeit
      put :forfeit
      get :my_hand
      patch :join
      put :join
      patch :play_card
      put :play_card
      patch :remove_point
      put :remove_point
      patch :show_hand
      put :show_hand
      patch :sit
      put :sit

      resources :joined_users, controller: "tables",param: :username,only: %i[] do
        get :hand
      end
    end
  end
end
