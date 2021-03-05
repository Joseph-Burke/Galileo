class Task < ApplicationRecord
  has_many :subtask_subtaskings, foreign_key: :supertask_id, class_name: "Subtasking"
  has_many :subtasks, through: :subtask_subtaskings

  has_many :supertask_subtaskings, foreign_key: :subtask_id, class_name: "Subtasking"
  has_many :supertasks, through: :supertask_subtaskings
end
