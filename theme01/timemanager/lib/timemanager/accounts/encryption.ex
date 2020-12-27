defmodule TimemanagerWeb.Accounts.Encryption do
  alias Timemanager.Accounts.User

  def hash_password(password), do: Bcrypt.hash_pwd_salt(password)

  def validate_password(%User{} = user, password) do
     Bcrypt.verify_pass(password,user.password)
  end
end