defmodule BloggerWeb.TopicController do
  use BloggerWeb, :controller

  alias Blogger.Blog
  alias Blogger.Blog.Topic

  action_fallback BloggerWeb.FallbackController

  def index(conn, _params) do
    topics = Blog.list_topics()
    render(conn, "index.json", topics: topics)
  end

  def create(conn, %{"topic" => topic_params}) do
    with {:ok, %Topic{} = topic} <- Blog.create_topic(topic_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", topic_path(conn, :show, topic))
      |> render("show.json", topic: topic)
    end
  end

  def show(conn, %{"id" => id}) do
    topic = Blog.get_topic!(id)
    render(conn, "show.json", topic: topic)
  end

  def update(conn, %{"id" => id, "topic" => topic_params}) do
    topic = Blog.get_topic!(id)

    with {:ok, %Topic{} = topic} <- Blog.update_topic(topic, topic_params) do
      render(conn, "show.json", topic: topic)
    end
  end

  def delete(conn, %{"id" => id}) do
    topic = Blog.get_topic!(id)
    with {:ok, %Topic{}} <- Blog.delete_topic(topic) do
      send_resp(conn, :no_content, "")
    end
  end
end
