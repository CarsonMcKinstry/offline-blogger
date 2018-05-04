defmodule Blogger.Repo.Migrations.CreateTopics do
  use Ecto.Migration

  def change do
    create table(:topics) do
      add :topic, :string, size: 20
    end

  end
end
