import logo from './logo.svg';
import './App.css';
import fetchData from './helpers/fetchData';
import { useState } from 'react';

function App() {
  let [dataSnippet, setDataSnippet] = useState('nothing');
  
  const data = fetchData().then(response => response.json() );
  data.then(fulfilledData => {
    setDataSnippet(fulfilledData.houses[0].location);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          Data Snippet: {dataSnippet}
        </p>
      </header>
    </div>
  );
}

export default App;
