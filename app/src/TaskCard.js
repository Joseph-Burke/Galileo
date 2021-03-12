import { useSelector, useDispatch } from "react-redux";
import { synchroniseStore } from "./reducers/reducer";
import { useState } from "react";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state);

  const potentialSubtasks = (function() {
    const invalidSubtaskIds = [
      ...task.supertask_ids,
      ...task.subtask_ids,
      task.id
    ];
    return tasks.filter(otherTask => !invalidSubtaskIds.includes(otherTask.id));
  })();

  const [selectedSubtask, setSelectedSubtask] = useState(potentialSubtasks[0]);

  const createSubtasking = (subtaskId, supertaskId) => {
    let subtask = tasks.find(otherTask => otherTask.id === subtaskId);
    let supertask = tasks.find(otherTask => otherTask.id === supertaskId);

    subtask.supertask_ids = [...subtask.supertask_ids, supertask.id];
    supertask.subtask_ids = [...supertask.subtask_ids, subtask.id];

    const URL = `http://localhost:4000/subtaskings`;
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ subtask_id: subtask.id, supertask_id: supertask.id })
    }).then(() => {
      dispatch(synchroniseStore);
    });
  };

  const updateTask = (task, dataKey, { target }) => {
    switch (dataKey) {
      case "completed":
        task[dataKey] = target.checked;
        break;
      case "subtask":
        task[dataKey] = [...task[dataKey], 4];
        break;
      default:
        return;
    }

    dispatch({
      type: "updateTask",
      payload: task
    });

    const URL = `http://localhost:4000/tasks/${task.id}`;
    fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ task })
    }).then(() => {
      dispatch(synchroniseStore);
    });
  };

  const deleteTask = task => {
    dispatch({ type: "removeTask", payload: task });
    const URL = `http://localhost:4000/tasks/${task.id}`;
    fetch(URL, { method: "DELETE" }).then(() => {
      dispatch(synchroniseStore);
    });
  };

  const subtasks = (
    <>
      <h5>Subtasks</h5>
      <ul>
        {task.subtask_ids.map(id => {
          const subtask = tasks.find(otherTask => otherTask.id === id);
          return (subtask ? <li value={subtask.id}>{subtask.title}</li> : null)
        })}
      </ul>

      {potentialSubtasks.length && selectedSubtask ? (
        <>
          <select
            onChange={({ target: { selectedIndex } }) => {
              setSelectedSubtask(potentialSubtasks[selectedIndex]);
            }}
          >
            {potentialSubtasks.map(otherTask => (
              <option>{otherTask.title}</option>
            ))}
          </select>
          {console.log({ selectedSubtask, task })}
          <button
            onClick={createSubtasking.bind(this, selectedSubtask.id, task.id)}
          >
            Add Subtask
          </button>
        </>
      ) : null}
    </>
  );

  const supertasks = (
    <>
      <h5>Supertasks</h5>
      <ul>
        {task.supertask_ids.map(id => {
          const supertask = tasks.find(otherTask => otherTask.id === id);
          return <li>{supertask.title}</li>;
        })}
      </ul>
    </>
  );

  return (
    <div key={task.id} style={{ border: "1px solid grey" }}>
      <h5>{task.title}</h5>
      <p>{task.description}</p>
      Completed:{" "}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={updateTask.bind(this, task, "completed")}
      />
      <button type="button" onClick={deleteTask.bind(this, task)}>
        Delete Task
      </button>
      <div>
        {subtasks}
        {supertasks}
      </div>
    </div>
  );
};

export default TaskCard;
