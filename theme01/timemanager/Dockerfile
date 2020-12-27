# Use an official Elixir runtime as a parent image
FROM elixir:latest
ENV PGHOST=timemanager-db.francecentral.azurecontainer.io
RUN apt-get update && \
  apt-get install -y postgresql-client inotify-tools && \
  sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list' && \
  wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc |  apt-key add - && \
  apt-get update && \
  apt-get -y install postgresql-client-13
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*

# Create app directory and copy the Elixir projects into it
RUN mkdir /app
COPY . /app
WORKDIR /app

# Install hex package manager
RUN mix local.hex --force

RUN mix deps.get


# Compile the project
run mix local.rebar --force
RUN mix do compile

CMD ["/app/entrypoint.sh"]
