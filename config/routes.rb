DoodleOrDieClone::Application.routes.draw do
  root to: "static_pages#root"

  # resource :session, :only => [:new, :create, :destroy]
  # resources :users, :only => [:new, :create, :show]
  #
  # resources :rooms, :only => [:index, :show, :create, :update, :destroy] do
  #   resources :chains, :only => [:create]
  # end
  #
  # resources :chains, :only => [:index, :show, :update, :destroy] do
  #   resources :steps, :only => [:create]
  # end
  #
  # resources :steps, :only => [:destroy]

  resource :session, :only => [:new, :create, :destroy]
  resources :users, :only => [:new, :create, :show]

  resources :rooms, :only => [:index, :show, :create, :update, :destroy] do
    resources :steps, :only => [:create, :destroy, :index]
  end

  resources :chains, :only => [:index, :show, :create, :update, :destroy]
end
