defmodule BloggerWeb.HealthController do
  use BloggerWeb, :controller

  def check(conn, _), do: render(conn, "index.json")
end