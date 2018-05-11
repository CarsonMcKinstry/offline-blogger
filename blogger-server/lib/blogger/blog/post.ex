defmodule Blogger.Blog.Post do
  use Ecto.Schema
  import Ecto.Changeset
  alias Blogger.Blog.Topic

  schema "posts" do
    field :author, :string
    field :title, :string
    field :body, :string
    field :index_db_id, :integer
    belongs_to :topic, Topic
    timestamps()
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:author, :title, :body, :topic_id, :index_db_id])
    |> validate_required([])
  end
end
