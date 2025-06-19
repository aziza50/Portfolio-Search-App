import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styling/DisplayProfile.css";
import LinkLogos from "../LinkLogos";
import { useParams } from "react-router-dom";
const DisplayProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile_data = await axios.get(
          `http://127.0.0.1:8000/users/profile/${id}/`
        );
        setProfileData(profile_data.data);
      } catch (error) {}
    };

    if (id) {
      fetchProfile();
    }
  }, [id]);

  //Should only render once it got the data
  if (!profileData) {
    return <div>Loading...</div>;
  }
  console.log(profileData);
  return (
    <>
      <div className="container-column">
        <div>
          <img
            className="circular-image"
            src={`http://127.0.0.1:8000${profileData.profile_picture}`}
            alt="Profile"
          />
          <h1 className="name">{profileData.name}</h1>
          <div className="display-logos">
            {profileData.links.map((link, index) =>
              link.link && link.type ? (
                <h3 key={index}>
                  <LinkLogos link={link.link} type={link.type} />{" "}
                </h3>
              ) : null
            )}
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4 text-white">My Profile</h1>
          <hr className="mb-4 strip" />
          <p className="bio">{profileData.bio}</p>
          <div className="fields">
            <h2>Fields I am interested in:</h2>
            {profileData.fields.map((field, index) => (
              <button className="fieldButton" key={index}>
                {field.field}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayProfile;
