import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { synchroniseStore } from "./reducers/reducer";
import TaskCard from './TaskCard';
import Form from './Form';

const App = () => {
  const tasks = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(synchroniseStore);
  }, []);

  return (
    <div className="App">
      <h3>Here is a list of your current tasks:</h3>
      {tasks.map(task => (
        <TaskCard task={task} />
      ))}
      <Form />
    </div>
  );
};

export default App;
