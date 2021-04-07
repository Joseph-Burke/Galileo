class Subtasking < ApplicationRecord
  belongs_to :subtask, class_name: "Task"
  belongs_to :supertask, class_name: "Task"
end
