import { useSelector, useDispatch } from "react-redux";
import { synchroniseStore } from "./reducers/reducer";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state);

  const updateTask = (task, dataKey, { target }) => {
    switch (dataKey) {
      case "completed":
        task[dataKey] = target.checked;
        break;
      case "subtasks":
        task[dataKey] = [...task[dataKey], 4]
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
        {console.log(task)}
        {task.subtask_ids.map(id => {
          const subtask = tasks.find(otherTask => otherTask.id === id);
          return <li>{subtask.title}</li>;
        })}
        <select>
          {tasks
            .filter(tasklistItem => {
              return ![...task.subtask_ids, task.id].includes(tasklistItem.id);
            })
            .map(task => (
              <option>{task.title}</option>
            ))}
        </select>
        <button></button>
        )
      </ul>
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
