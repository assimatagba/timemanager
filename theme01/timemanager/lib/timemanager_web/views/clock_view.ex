defmodule TimemanagerWeb.ClockView do
  use TimemanagerWeb, :view
  alias TimemanagerWeb.ClockView

  def render("index.json", %{clocks: clocks}) do
    %{data: render_many(clocks, ClockView, "clock.json")}
  end

  def render("show.json", %{clock: clock}) do
    %{data: render_many(clock, ClockView, "clock.json")}
  end

  def render("create.json", %{clock: clock}) do
    %{data: render_one(clock, ClockView, "clock.json")}
  end

  def render("clock.json", %{clock: clock}) do
    %{id: clock.id,
      time: clock.time,
      status: clock.status,
      user_id: clock.user,
      workingtime_id: clock.workingtime,
      hours: clock.hours
    }
  end
end
