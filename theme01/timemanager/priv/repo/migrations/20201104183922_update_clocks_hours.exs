defmodule Timemanager.Repo.Migrations.UpdateClocksHours do
  use Ecto.Migration

  def change do
    alter table (:clocks) do
      modify :hours, :float, null: true
    end
  end
end
