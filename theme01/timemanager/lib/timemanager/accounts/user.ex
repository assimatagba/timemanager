defmodule Timemanager.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string, null: false
    field :username, :string, null: false
    field :password, :string, null: false
    field :role, :string, null: false

    timestamps()
  end

  def validate_role(changeset, field, options \\ []) do
    validate_change(changeset, field, fn _, value ->
      if value != "employee" && value != "manager" && value != "admin" do
        [{field, options[:message] || "This field must be \"employee\" , \"manager\" or \"admin\""}]
      else
        []
      end
    end)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :email, :role, :password])
    |> validate_required([:username, :email, :role, :password])
    |> validate_role(
         :role
       )
    |> validate_format(:email, ~r/@/)
    |> encrypt_password
    |> unique_constraint(
         :username,
         name: :unique_user,
         Message: "Username already taken"
       )
    |> unique_constraint(
         :email,
         name: :unique_email,
         Message: "Email already taken"
       )
  end

  defp encrypt_password(changeset) do
    password = get_change(changeset, :password)
    if password do
      encrypted_password = TimemanagerWeb.Accounts.Encryption.hash_password(password)
      put_change(changeset, :password, encrypted_password)
    else
      changeset
    end
  end
end
