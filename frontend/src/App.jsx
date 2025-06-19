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
  localStorage.clear("profileId");
  const [profileId, setProfileId] = useState(localStorage.getItem("profileId"));
  const [page, setPage] = useState("Home");
  useEffect(() => {
    const stored = localStorage.getItem("profileId");
    if (stored !== profileId) {
      setProfileId(stored);
    }
  }, [profileId]);

  return (
    <>
      <div className="App">
        <Layout profileId={profileId}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/display-profiles" element={<DisplayProfiles />} />
            <Route
              path="/create-profile"
              element={<CreateProfile setProfileId={setProfileId} />}
            />
            <Route path="/profile/:id" element={<DisplayProfile />} />
          </Routes>
        </Layout>
      </div>
    </>
  );
}

export default App;
