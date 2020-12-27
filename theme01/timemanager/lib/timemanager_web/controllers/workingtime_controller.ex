defmodule TimemanagerWeb.WorkingtimeController do
  use TimemanagerWeb, :controller

  alias Timemanager.Time
  alias Timemanager.Time.Workingtime

  action_fallback TimemanagerWeb.FallbackController

  def index(conn, _params) do
    workingtimes = Time.list_workingtimes()
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def showOne(conn, %{"userID" => userID,"workingtimeID" => workingtimeID}) do
    workingtimes = Time.get_workingtime_userId!(userID, workingtimeID)
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def get_next_workingtime(conn, %{"userID" => userID}) do
    workingtimes = Time.get_next_workingtime(userID)
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def get_current_workingtime(conn, %{"userID" => userID}) do
    workingtimes = Time.get_current_workingtime(userID)
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def create(conn, %{"workingtime" => %{"start" => start, "end" => end_date, "title" => title, "description" => description}, "userID" => userID, "currentUserId" => currentUserId}) do
    currentUser = Timemanager.Accounts.get_user!(currentUserId)
    user = Timemanager.Accounts.get_user!(userID)


    if currentUser.role == "admin" || currentUser.role == "manager" do
      with {:ok, %Workingtime{} = workingtime} <- Time.create_workingtime(%{"start" => start, "end" => end_date, "user" => userID, "title" => title, "description" => description}) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", Routes.workingtime_path(conn, :show, workingtime))
        |> render("show.json", workingtime: workingtime)
      end
    end

  end

  def show(conn, %{"id" => id, "start" => start, "end" => end_date}) do
    workingtime = Time.get_workingtime!(id,NaiveDateTime.from_iso8601!(start), NaiveDateTime.from_iso8601!(end_date))
    render(conn, "show_many.json", workingtime: workingtime)
  end

  def showByUserId(conn, %{"userID" => id}) do
    workingtime = Time.get_workingtime_userId_only!(id)
    render(conn, "show_many.json", workingtime: workingtime)
  end

  def update(conn, %{"id" => id, "workingtime" => workingtime_params}) do
    workingtime = Time.get_workingtime!(id)

    with {:ok, %Workingtime{} = workingtime} <- Time.update_workingtime(workingtime, workingtime_params) do
      render(conn, "show.json", workingtime: workingtime)
    end
  end

  def delete(conn, %{"id" => id}) do
    workingtime = Time.get_workingtime!(id)

    with {:ok, %Workingtime{}} <- Time.delete_workingtime(workingtime) do
      send_resp(conn, :no_content, "")
    end
  end
end
