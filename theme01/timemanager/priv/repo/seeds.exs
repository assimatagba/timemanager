# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Timemanager.Repo.insert!(%Timemanager.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

#Timemanager.Accounts.User.changeset(%Timemanager.Accounts.User{}, %{email: "test@test.test", username: "test"})
#Timemanager.Time.Clock.changeset(%Timemanager.Time.Clock{}, %{status: false, time: "2020-10-01 09:00:00", user: 1})
#Timemanager.Time.Clock.changeset(%Timemanager.Time.Clock{}, %{status: false, time: "2020-10-02 09:00:00", user: 1})
#Timemanager.Time.Clock.changeset(%Timemanager.Time.Clock{}, %{status: false, time: "2020-10-03 09:00:00", user: 1})
#Timemanager.Time.Workingtime.changeset(%Timemanager.Time.Workingtime{}, %{start: "2020-09-28 09:00:00", end: "2020-10-02 17:00:00", user: 1})
#Timemanager.Time.Workingtime.changeset(%Timemanager.Time.Workingtime{}, %{start: "2020-10-05 09:00:00", end: "2020-10-09 17:00:00", user: 1})


Timemanager.Repo.insert! %Timemanager.Accounts.User{
  email: "admin@test.test",
  username: "admin",
  role: "admin",
  password: Bcrypt.hash_pwd_salt("admin")
}

Timemanager.Repo.insert! %Timemanager.Accounts.User{
  email: "manager1@test.test",
  username: "manager1",
  role: "manager",
  password: Bcrypt.hash_pwd_salt("manager")
}

Timemanager.Repo.insert! %Timemanager.Accounts.User{
  email: "employee1@test.test",
  username: "employee1",
  role: "employee",
  password: Bcrypt.hash_pwd_salt("employee")
}

Timemanager.Repo.insert! %Timemanager.Accounts.User{
  email: "manager2@test.test",
  username: "manager2",
  role: "manager",
  password: Bcrypt.hash_pwd_salt("manager")
}

Timemanager.Repo.insert! %Timemanager.Accounts.User{
  email: "employee2@test.test",
  username: "employee2",
  role: "employee",
  password: Bcrypt.hash_pwd_salt("test")
}


Timemanager.Repo.insert! %Timemanager.Time.Workingtime{
  start: NaiveDateTime.from_iso8601!("2020-09-28 09:00:00"),
  end: NaiveDateTime.from_iso8601!("2020-10-02 17:00:00"),
  title: "titre1",
  description: "desc",
  user: 1
}
Timemanager.Repo.insert! %Timemanager.Time.Workingtime{
  start: NaiveDateTime.from_iso8601!("2020-10-05 09:00:00"),
  end: NaiveDateTime.from_iso8601!("2020-10-09 17:00:00"),
  title: "titre1",
  description: "desc",
  user: 1
}

Timemanager.Repo.insert! %Timemanager.Time.Clock{
  status: false,
  time: NaiveDateTime.from_iso8601!("2020-10-01 09:00:00"),
  user: 1
}
Timemanager.Repo.insert! %Timemanager.Time.Clock{
  status: false,
  time: NaiveDateTime.from_iso8601!("2020-10-02 09:00:00"),
  user: 1,
  workingtime: 1
}
Timemanager.Repo.insert! %Timemanager.Time.Clock{
  status: false,
  time: NaiveDateTime.from_iso8601!("2020-10-03 09:00:00"),
  user: 1
}
