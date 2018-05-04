use Mix.Config

# In this file, we keep production configuration that
# you'll likely want to automate and keep away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or yourself later on).
config :blogger, BloggerWeb.Endpoint,
  secret_key_base: "/HskzNbVX0L/auvkdqDrVu4dHa6D0SK6CpLOWy0ScI47TQrRDGeQbqavO6y35Pco"

# Configure your database
config :blogger, Blogger.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "blogger_prod",
  pool_size: 15
