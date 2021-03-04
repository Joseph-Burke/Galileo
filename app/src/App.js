import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { synchroniseStore } from "./reducers/reducer";

const App = () => {
  const tasks = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(synchroniseStore);
  }, []);

  const updateTask = (task, dataKey, { target }) => {
    switch (dataKey) {
      case "completed":
        task[dataKey] = target.checked;
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

  return (
    <div className="App">
      Here is a list of your current tasks:
      {tasks.map(task => {
        return (
          <div key={task.id} style={{ border: "1px solid grey" }}>
            Title: {task.title}
            Description: {task.description}
            Completed:{" "}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={updateTask.bind(this, task, "completed")}
            />
          </div>
        );
      })}
    </div>
  );
};

export default App;
