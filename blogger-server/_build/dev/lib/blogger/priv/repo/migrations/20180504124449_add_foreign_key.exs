defmodule Blogger.Repo.Migrations.AddForeignKey do
  use Ecto.Migration

  def change do
    alter table("posts") do
      remove :topic
      add :topic_id, references("topics")
    end
  end
end
