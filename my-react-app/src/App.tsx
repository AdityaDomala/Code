import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Sidebar/>
        {/* <div className="main-content">Main Content (80%)</div> */}
      </div>
    </div>
  );
}

export default App;
