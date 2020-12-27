defmodule TimemanagerWeb.WorkingtimeView do
  use TimemanagerWeb, :view
  alias TimemanagerWeb.WorkingtimeView

  def render("index.json", %{workingtimes: workingtimes}) do
    %{data: render_many(workingtimes, WorkingtimeView, "workingtime.json")}
  end

  def render("show.json", %{workingtime: workingtime}) do
    %{data: render_one(workingtime, WorkingtimeView, "workingtime.json")}
  end

  def render("show_many.json", %{workingtime: workingtime}) do
    %{data: render_many(workingtime, WorkingtimeView, "workingtime.json")}
  end

  def render("workingtime.json", %{workingtime: workingtime}) do
    %{id: workingtime.id,
      title: workingtime.title,
      description: workingtime.description,
      start: workingtime.start,
      end: workingtime.end,
      user_id: workingtime.user}
  end
end
