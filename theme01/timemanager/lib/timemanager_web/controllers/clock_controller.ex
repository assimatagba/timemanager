defmodule TimemanagerWeb.ClockController do
  use TimemanagerWeb, :controller

  alias Timemanager.Time
  alias Timemanager.Time.Clock

  action_fallback TimemanagerWeb.FallbackController

  def index(conn, _params) do
    clocks = Time.list_clocks()
    render(conn, "index.json", clocks: clocks)
  end

  def create(conn, %{"clock" => %{"time" => time, "status" => status, "workingtime_id" => workingtimeId, "hours" => hours}, "userID" => userID}) do
    with {:ok, %Clock{} = clock} <- Time.create_clock(%{"time" => time, "status" => status, "user" => userID, "workingtime" => workingtimeId, "hours" => hours}) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.clock_path(conn, :show, clock))
      |> render("create.json", clock: clock)
    end
  end

  def show(conn, %{"id" => id}) do
    clock = Time.get_clock!(id)
    render(conn, "show.json", clock: clock)
  end

  def update(conn, %{"clockId" => id, "clock" => clock_params}) do
    clock = Time.get_clock_by_id!(id)

    with {:ok, %Clock{} = clock} <- Time.update_clock(clock, clock_params) do
      render(conn, "clock.json", clock: clock)
    end
  end

  def getClockBetweenTwoDates(conn, %{"userID" => id, "start" => startDate, "end" => endDate }) do
    clocks = Time.getClockBetweenTwoDates(id, startDate,endDate)
    render(conn, "index.json", clocks: clocks)
  end

  def delete(conn, %{"id" => id}) do
    clock = Time.get_clock_by_id!(id)

    with {:ok, %Clock{}} <- Time.delete_clock(clock) do
      send_resp(conn, :no_content, "")
    end
  end
end
