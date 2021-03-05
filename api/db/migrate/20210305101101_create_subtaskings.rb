class CreateSubtaskings < ActiveRecord::Migration[6.1]
  def change
    create_table :subtaskings do |t|
      t.integer :subtask_id, foreign_key: true
      t.integer :supertask_id, foreign_key: true

      t.timestamps
    end
  end
end
