import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProjectListScreen } from "screens/project-list";
import { LoginScreen } from "screens/login";

function App() {
  return (
    <div className="App">
      <div className="App">
        <LoginScreen />
        {/* <ProjectListScreen /> */}
      </div>
    </div>
  );
}

export default App;
