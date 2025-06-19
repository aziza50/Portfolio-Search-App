import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styling/DisplayProfiles.css";
import LinkLogos from "../LinkLogos";
//Pascal casing --> Always first letter capital
//Functional component using javascript instead of React component
const DisplayProfiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/users/profiles/")
      .then((res) => {
        setProfiles(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <h1 className="creators-text font-bold mb-4 text-white text-start">
        Creators
      </h1>
      <hr className="custom-line" />
      <div className="card-grid">
        {profiles.map((profile, id) => (
          <div key={id}>
            <div className="card-body divide-card">
              <div>
                <img
                  className="profile-display"
                  src={`http://127.0.0.1:8000${profile.profile_picture}`}
                ></img>
                <h1 style={{ fontSize: "25px", marginTop: "10px" }}>
                  {profile.name}
                </h1>
                {profile.links.map((link, index) =>
                  link.link && link.type ? (
                    <h3 key={index}>
                      <LinkLogos link={link.link} type={link.type} />{" "}
                    </h3>
                  ) : null
                )}
              </div>
              <div>
                <h5 className="card-title">{profile.bio}</h5>
                {profile.fields.map((field, index) => (
                  <button key={index}>{field.field}</button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayProfiles;
