import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Redirect, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
