defmodule Timemanager.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string
      add :email, :string
      add :role, :string
      add :password, :string

      timestamps()
    end

    create unique_index(:users, [:email], name: :unique_email)
    create unique_index(:users, [:username], name: :unique_user)
  end
end
