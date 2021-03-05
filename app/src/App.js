import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { synchroniseStore } from "./reducers/reducer";

const App = () => {
  const tasks = useSelector(state => state);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ title: "", description: "" })

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

  const handleFormChange = ({ target }) => {
    if (Object.keys(formData).includes(target.name)) {
      setFormData({
        ...formData,
        [target.name]: target.value
      });
    };
  };

  const submitForm = () => {
    const task = { ...formData, completed: false};
    setFormData({ title: "", description: "" });
    dispatch({ type: "createTask", payload: task });

    // This could use a "postTask" helper method.
    const URL = `http://localhost:4000/tasks/`;
    fetch(URL, {
      method: "POST",
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
    dispatch({type: "removeTask", payload: task });
    const URL = `http://localhost:4000/tasks/${task.id}`;
    fetch(URL, { method: "DELETE" }
    ).then(() => {
      dispatch(synchroniseStore);
    });
  }

  return (
    <div className="App">
      <h3>Here is a list of your current tasks:</h3>
      {tasks.map(task => {
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
          </div>
        );
      })}

      <form>
        <label htmlFor="title">
          Title:
          <input name="title" type="text" value={formData.title} onChange={handleFormChange.bind(this)} />
        </label>
        <br />
        <label htmlFor="description">
          Description:
          <textarea name="description" rows={5} type="textarea" value={formData.description} onChange={handleFormChange.bind(this)} />
        </label>
        <br />
        <button
          type="button"
          onClick={submitForm}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
