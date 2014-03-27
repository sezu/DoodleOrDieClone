DoodleOrDieClone::Application.routes.draw do
  root to: "static_pages#root"

  resource :session, :only => [:new, :create, :destroy]
  resources :users, :only => [:new, :create, :show]

  resources :rooms, :only => [:index, :show, :create, :update], defaults: {:format => :json} do
    get "fetch_step", to: "steps#fetch_next_step"
    put "fetch_step/:id", to: "steps#skip"

    resource :timeline, :only => [:show, :create]
  end

  resources :chains, :only => [:show, :update, :create] do
    resources :steps, :only => [:create]
  end
end
