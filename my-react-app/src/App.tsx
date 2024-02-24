import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ContentComponent from "./components/ContentComponent";

function App() {
  const [selectedItem, setSelectedItem] = useState([]);

  return (
    <div className="App">
      <div className="container">
        <Sidebar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        <ContentComponent
          className="main-content"
          selectedFilesContents={selectedItem} />
      </div>
    </div>
  );
}

export default App;
