defmodule TimemanagerWeb.Router do
  use TimemanagerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug CORSPlug, origin: "*"
  end

  scope "/", TimemanagerWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
   scope "/api", TimemanagerWeb do
     pipe_through :api
     resources "/users", UserController, except: [:delete, :update]
     resources "/workingtimes", WorkingtimeController, except: [:create]
     resources "/clocks", ClockController, except: [:create, :update]
     delete("/users/:userID", UserController, :delete)
     put("/users/:userID", UserController, :update)
     put("/clocks/:clockId", ClockController, :update)
     post("/clocks/:userID", ClockController, :create)
     get("/clocks/betweendates/:userID", ClockController, :getClockBetweenTwoDates)
     post("/workingtimes/:userID", WorkingtimeController, :create)
     get("/workingtimes/user/:userID", WorkingtimeController, :showByUserId)
     get("/workingtimes/next/:userID", WorkingtimeController, :get_next_workingtime)
     get("/workingtimes/current/:userID", WorkingtimeController, :get_current_workingtime)
     get("/workingtimes/:userID/:workingtimeID", WorkingtimeController, :showOne)
     post("/sign_up/", UserController, :sign_up)
     post("/sign_in/", UserController, :sign_in)
     get("/token/", UserController, :sendCSRFtoken)
   end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: TimemanagerWeb.Telemetry
    end
  end
end
