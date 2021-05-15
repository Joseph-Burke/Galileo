class Subtasking < ApplicationRecord
  belongs_to :subtask, class_name: "Task"
  belongs_to :supertask, class_name: "Task"

  accepts_nested_attributes_for :subtask, :supertask
end
