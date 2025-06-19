import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  let content;
  let text;

  if (localStorage.getItem("profileId")) {
    content = "/display-profile";
    text = "Profile";
  } else {
    content = "/create-profile";
    text = "Create Profile";
  }
  console.log(localStorage.getItem("profileId"));
  return (
    <div>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <Link to="/" className="custom-navbar">
            Illumina
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarText"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/home" className="nav-link ">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/display-profiles" className="nav-link ">
                  Explore
                </Link>
              </li>
              <li className="nav-item">
                <Link to={content} className="nav-link">
                  {text}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
