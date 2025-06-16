import React from "react";
import axios from "axios";
import CreateProfile from "./components/CreateProfile";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Newsreader"
        rel="stylesheet"
      ></link>
      <div>
        <Home></Home>
      </div>
    </>
  );
}

export default App;
