defmodule Timemanager.Repo.Migrations.UpdateClocks do
  use Ecto.Migration

  def change do
    alter table(:clocks) do
      add :hours, :integer, null: true
    end
  end
end
