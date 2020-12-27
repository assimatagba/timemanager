defmodule Timemanager.Time.Clock do
  use Ecto.Schema
  import Ecto.Changeset

  schema "clocks" do
    field :status, :boolean, default: false, null: false
    field :time, :naive_datetime, null: false
    field :user, :id, null: false
    field :workingtime, :id, null: true
    field :hours, :float, null: true

    timestamps()
  end

  @doc false
  def changeset(clock, attrs) do
    clock
    |> cast(attrs, [:time, :status, :user, :workingtime, :hours])
    |> validate_required([:time, :status, :user])
  end
end
