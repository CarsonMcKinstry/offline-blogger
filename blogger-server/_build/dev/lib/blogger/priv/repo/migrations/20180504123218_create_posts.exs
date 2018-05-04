defmodule Blogger.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
        add :author, :string, size: 40
        add :title, :string, size: 40
        add :body, :string, size: 500
        add :topic, :integer
      timestamps()
    end

  end
end
