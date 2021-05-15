class Task < ApplicationRecord
  has_many :subtask_subtaskings, foreign_key: :supertask_id, class_name: "Subtasking", dependent: :destroy
  has_many :subtasks, through: :subtask_subtaskings

  has_many :supertask_subtaskings, foreign_key: :subtask_id, class_name: "Subtasking", dependent: :destroy
  has_many :supertasks, through: :supertask_subtaskings

  accepts_nested_attributes_for :subtask_subtaskings, :supertask_subtaskings

  def build_sub_and_super_subtaskings
    [self.subtask_subtaskings, self.supertask_subtaskings].each { |foo| foo.build }
  end

end
