defmodule BloggerWeb.PostView do
  use BloggerWeb, :view
  alias BloggerWeb.PostView

  def render("index.json", %{posts: posts}) do
    %{data: render_many(posts, PostView, "post.json")}
  end

  def render("show.json", %{post: post}) do
    %{data: render_one(post, PostView, "post.json")}
  end

  def render("post.json", %{post: %{content: post, topic: topic}}) do
    %{
      id: post.id,
      author: post.author,
      body: post.body,
      title: post.title,
      topic: topic
    }
  end
end
