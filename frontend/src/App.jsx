import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Home,
  DisplayProfile,
  DisplayProfiles,
  CreateProfile,
  Layout,
} from "./components/pages/";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [page, setPage] = useState("Home");
  return (
    <>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/display-profiles" element={<DisplayProfiles />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/display-profile" element={<DisplayProfile />} />
          </Routes>
        </Layout>
      </div>
    </>
  );
}

export default App;
