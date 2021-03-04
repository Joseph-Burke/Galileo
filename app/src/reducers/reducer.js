import fetchData from "../helpers/fetchData";

const tasksReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case "synchroniseStore":
      return payload;
    case 'updateTask':
      const updatedTaskIndex = state.findIndex(task => task.id === payload.id);
      state[updatedTaskIndex] = payload;
      return [...state];
    default:
      return state;
  }
};

export default tasksReducer;

export async function synchroniseStore(dispatch) {
  const data = await fetchData();
  dispatch({ type: "synchroniseStore", payload: data });
};