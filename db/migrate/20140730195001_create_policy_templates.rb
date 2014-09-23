class CreatePolicyTemplates < ActiveRecord::Migration
  def up
    create_table :policy_templates do |t|
      t.string :name
      t.boolean :is_active
      t.text :body

      t.timestamps
    end
  end

  def down
  	drop_table :policy_templates
  end
end
