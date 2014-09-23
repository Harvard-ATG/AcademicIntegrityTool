class CreatePolicies < ActiveRecord::Migration
  def up
    create_table :policies do |t|
      t.string :context_id
      t.integer :policy_template_id
      t.boolean :is_published
      t.string :published_by
      t.text :body

      t.timestamps
    end

    add_index :policies, :context_id
    add_index :policies, :policy_template_id 
  end

  def down
    drop_table :policies
  end
end
