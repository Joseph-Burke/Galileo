import fetchData from "./helpers/fetchData";
import { useState } from "react";

function App() {
  let [dataSnippet, setDataSnippet] = useState("nothing");

  const data = fetchData().then(response => response.json());
  data.then(fulfilledData => {
    setDataSnippet(fulfilledData);
  });

  // console.log(dataSnippet);

  return (
    <div className="App">
      Here is a list of your current tasks:
      Data Snippet {dataSnippet[0].title}
      {/* {
        dataSnippet.map(
          task => (
            <div>
              <h4>{task.title}</h4>
              <p>{task.title}</p>
              <p>{task.completed}</p>
            </div>
          ) 
        )
      } */}
    </div>
  )
}

export default App;
