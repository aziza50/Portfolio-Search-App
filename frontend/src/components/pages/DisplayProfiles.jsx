import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styling/DisplayProfiles.css";
import LinkLogos from "../LinkLogos";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import DisplayProfile from "./DisplayProfile";
//Pascal casing --> Always first letter capital
//Functional component using javascript instead of React component
const DisplayProfiles = () => {
  const [searchField, setSearchField] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const model_data = await axios.get(
          `http://127.0.0.1:8000/users/fields/choices/`
        );
        const choices = model_data.data.map((field) => ({
          value: field.value,
          label: field.label,
        }));
        setOptions(choices);
      } catch (error) {}
    };
    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/users/profiles/")
      .then((res) => {
        setProfiles(res.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    let filter = profiles;
    if (searchName) {
      filter = filter.filter((profile) =>
        profile.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    if (searchField) {
      filter = filter.filter((profile) =>
        profile.fields.some((field) =>
          field.field.toLowerCase().includes(searchField.toLowerCase())
        )
      );
    }

    setFilteredProfiles(filter);
  }, [searchName, searchField, profiles]);

  const handleSearch = (event) => {
    setSearchName(event.target.value);
  };

  const handleFilter = (event) => {
    setSearchField(event.target.value);
  };
  return (
    <>
      <div>
        <h1 className="creators-text">Creators</h1>
        <div className="SearchFilter">
          <div>
            <input
              className="search"
              type="text"
              placeholder="Search Names"
              value={searchName}
              onChange={handleSearch}
            />
          </div>
          <div className="filterFields">
            <select value={searchField} onChange={handleFilter}>
              <option value="">All Fields</option>
              {options.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <hr className="custom-line" />
      {filteredProfiles.map((profile, id) => (
        <Link
          to={`/profile/${profile.id}`}
          key={profile.id}
          style={{
            fontSize: "25px",
            marginTop: "10px",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div className="card-grid">
            <div key={id}>
              <div className="card-body divide-card">
                <div>
                  <img
                    className="profile-display"
                    src={`http://127.0.0.1:8000${profile.profile_picture}`}
                  ></img>
                  <h1
                    style={{
                      fontSize: "25px",
                      marginTop: "10px",
                    }}
                  >
                    {profile.name}
                  </h1>
                  <div className="display-logos">
                    {profile.links.map((link, index) =>
                      link.link && link.type ? (
                        <h3 key={index}>
                          <LinkLogos link={link.link} type={link.type} />{" "}
                        </h3>
                      ) : null
                    )}
                  </div>
                </div>
                <div>
                  <h5 className="card-title">{profile.bio}</h5>
                  {profile.fields.map((field, index) => (
                    <button className="fieldButton" key={index}>
                      {field.field}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default DisplayProfiles;
