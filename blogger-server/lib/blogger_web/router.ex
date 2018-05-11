defmodule BloggerWeb.Router do
  use BloggerWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", BloggerWeb do
    pipe_through :api
    
    resources "/posts", PostController
    get "/topics", TopicController, :index
    get "/health", HealthController, :check
  end
end
