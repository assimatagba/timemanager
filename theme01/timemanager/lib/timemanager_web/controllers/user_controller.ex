defmodule TimemanagerWeb.UserController do
  use TimemanagerWeb, :controller

  alias Timemanager.Accounts
  alias Timemanager.Accounts.User

  action_fallback TimemanagerWeb.FallbackController

  def index(conn, %{"username" => username, "email" => email}) do
    users = Accounts.get_by_username(username, email)
    render(conn, "index.json", users: users)
  end

  def sendCSRFtoken(conn, %{}) do
    token = get_csrf_token()
    render(conn, "token.json", token: token)
  end

  def index(conn, _params) do
    test = get_csrf_token()
    IO.puts(test)
#    IO.puts(get_csrf_token())
#    extra_claims = %{"user_id" => 1, "role" => "test", "token" => test}
#    token_with_default_plus_custom_claims = Timemanager.Token.generate_and_sign!(extra_claims)
#    IO.puts(token_with_default_plus_custom_claims)
#    claims = Timemanager.Token.verify_and_validate(token_with_default_plus_custom_claims)
#    IO.puts(claims)
    users = Accounts.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params, "userId" => userId}) do

    currentUser = Accounts.get_user!(userId)
    if currentUser.role != "manager" && currentUser.role != "admin" do
      conn
      |> put_status(:unauthorized )
      |> render("error.json", error: "only \"manager\" or \"admin\" can create users")
    else
      with {:ok, %User{} = user} <- Accounts.create_user(user_params) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", Routes.user_path(conn, :show, user))
        |> render("show.json", user: user)
      end
    end

  end

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    render(conn, "show.json", user: user)
  end

  defp authenticate(user, password) do
    if user do
      authenticated_user = case Bcrypt.verify_pass(password,user.password) do
        true  -> true
        false -> false
      end
    else
      nil
    end
  end

  def sign_in(conn, %{"email" => email, "password" => password}) do
    user = Accounts.login(email)
    case authenticate(user, password) do
      true -> sendToken(conn, %{"user" =>user})
      _    -> render(conn,"error.json", error: "Email or password incorrect")
    end

  end

  def sendToken(conn, %{"user" => user}) do
    extra_claims = %{"user_id" => user.id, "role" => user.role, "x-csrf-token" => get_csrf_token()}
    token_with_default_plus_custom_claims = Timemanager.Token.generate_and_sign!(extra_claims)
    IO.puts(token_with_default_plus_custom_claims)
    render(conn, "token.json", token: token_with_default_plus_custom_claims)
  end


   def sign_up(conn, %{"email" => email, "password" => password, "username" => username}) do
    with {:ok, %User{} = user} <- Accounts.create_user(%{"email" => email, "password" => password, "role" => "employee", "username" => username}) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end



  def update(conn, %{"userID" => userID, "user" => %{"email" => email, "role" => role, "username" => username, "password" => password}, "currentUserId" => currentUserId}) do
    user = Accounts.get_user!(userID)
    currentUser = Accounts.get_user!(currentUserId)

    if !password do
      with {:ok, %User{} = user} <- Accounts.update_user(user, %{"email" => email, "role" => role, "username" => username, "password" => currentUser.password}) do
        render(conn, "show.json", user: user)
      end
    end

    if password do
      with {:ok, %User{} = user} <- Accounts.update_user(user, %{"email" => email, "role" => role, "username" => username, "password" => password}) do
        render(conn, "show.json", user: user)
      end
    end

#    if currentUser.id != user.id && currentUser.role == "admin" do
#      with {:ok, %User{} = user} <- Accounts.update_user(user, %{"email" => email, "role" => role, "username" => username}) do
#        render(conn, "show.json", user: user)
#      end
#    end

#    if currentUser.id != user.id && currentUser.role == "manager" && user.role == "employee" do
#      with {:ok, %User{} = user} <- Accounts.update_user(user, %{"email" => email, "role" => role, "username" => username}) do
#        render(conn, "show.json", user: user)
#      end
#    end


    end


  def delete(conn, %{"userID" => id, "currentUserId" => currentUserId}) do
    user = Accounts.get_user!(id)
    currentUser = Accounts.get_user!(currentUserId)

    if currentUser.id == user.id do
      with {:ok, %User{}} <- Accounts.delete_user(user) do
        send_resp(conn, :no_content, "")
      end
    end

    if currentUser.id != user.id && currentUser.role == "admin" do
      with {:ok, %User{}} <- Accounts.delete_user(user) do
        send_resp(conn, :no_content, "")
      end
    end

    if currentUser.id != user.id && currentUser.role == "manager" && user.role == "employee" do
      with {:ok, %User{}} <- Accounts.delete_user(user) do
        send_resp(conn, :no_content, "")
      end
    end



  end
end
