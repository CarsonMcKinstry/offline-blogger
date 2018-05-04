defmodule Blogger.Repo.Migrations.IndexDbColumn do
  use Ecto.Migration

  def change do
    alter table(:posts) do
      add :index_db_id, :integer
    end
  end
end
