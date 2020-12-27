defmodule Timemanager.Time.Workingtime do
  use Ecto.Schema
  import Ecto.Changeset

  schema "workingtimes" do
    field :end, :naive_datetime, null: false
    field :start, :naive_datetime, null: false
    field :user, :id, null: false
    field :title, :string, null: false
    field :description, :string, null: false

    timestamps()
  end

  @doc false
  def changeset(workingtime, attrs) do
    workingtime
    |> cast(attrs, [:start, :end, :user, :title, :description])
    |> validate_required([:start, :end, :title, :description])
  end
end
