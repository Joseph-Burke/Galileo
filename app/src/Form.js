import { useState } from "react";
import { useDispatch } from "react-redux";
import { synchroniseStore } from "./reducers/reducer";

const Form = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const dispatch = useDispatch();

  const resetForm = () => setFormData({ title: "", description: "" });

  const handleFormChange = ({ target }) => {
    if (Object.keys(formData).includes(target.name)) {
      setFormData({
        ...formData,
        [target.name]: target.value
      });
    }
  };

  const submitForm = () => {
    const task = { ...formData, completed: false, subtask_ids: [], supertask_ids: [] };
    resetForm();
    dispatch({ type: "createTask", payload: task });

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

  return (
    <form>
      <label htmlFor="title">
        Title:
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleFormChange.bind(this)}
        />
      </label>
      <br />
      <label htmlFor="description">
        Description:
        <textarea
          name="description"
          rows={5}
          type="textarea"
          value={formData.description}
          onChange={handleFormChange.bind(this)}
        />
      </label>
      <br />
      <button type="button" onClick={submitForm}>
        Submit
      </button>
    </form>
  );
};

export default Form;
