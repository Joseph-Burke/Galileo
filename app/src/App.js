import fetchData from "./helpers/fetchData";
import { useState } from "react";
import { connect } from "react-redux";

const App = ({tasks}) => {
  return (
    <div className="App">
      Here is a list of your current tasks: Data Snippet
    </div>
  );
}

const mapStateToProps = state => ({
  tasks: state
});

export default connect(mapStateToProps)(App);
