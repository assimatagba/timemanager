defmodule TimemanagerWeb.UserView do
  use TimemanagerWeb, :view
  alias TimemanagerWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("error.json", %{error: error}) do
    %{
      error: error,
    }
  end

  def render("token.json", %{token: token}) do
    %{
      token: token,
    }
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      password: user.password
    }
  end
end
