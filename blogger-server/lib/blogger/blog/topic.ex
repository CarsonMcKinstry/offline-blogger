defmodule Blogger.Blog.Topic do
  use Ecto.Schema
  import Ecto.Changeset
  alias Blogger.Blog.Post

  schema "topics" do
    field :topic, :string
    has_many :posts, Post
  end

  @doc false
  def changeset(topic, attrs) do
    topic
    |> cast(attrs, [])
    |> validate_required([])
  end
end
