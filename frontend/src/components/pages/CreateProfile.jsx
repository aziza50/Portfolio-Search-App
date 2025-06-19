import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "../styling/CreateProfile.css";
import backgroundImage from "/assets/backgroundImagess.webp";
import { useNavigate } from "react-router-dom";
const CreateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    image: null,
  });
  const [options, setOptions] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [linkInputs, setLinkInputs] = useState([{ link: "", type: "" }]);
  const [optionsLinks, setOptionsLinks] = useState([]);

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
    const fetchData = async () => {
      try {
        const model_data = await axios.get(
          `http://127.0.0.1:8000/users/links/types/`
        );
        const choices = model_data.data.map((link) => ({
          value: link.value,
          label: link.label,
        }));
        setOptionsLinks(choices);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...linkInputs];
    updatedLinks[index].link = value;
    setLinkInputs(updatedLinks);
  };

  const handleTypeChange = (index, value) => {
    const updatedLinks = [...linkInputs];
    updatedLinks[index].type = value;
    setLinkInputs(updatedLinks);
  };

  const addLinkInput = () => {
    if (linkInputs.length < 3) {
      setLinkInputs([...linkInputs, { link: "", type: "" }]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("bio", formData.bio);
    //.startWith('image/') checsfor image/png , image/jpeg, image/webp and etc to ensure formData.image is of image type
    if (formData.image && !formData.image.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    payload.append("profile_picture", formData.image);
    //ensure selectedFields is at least one
    if (selectedFields.length == 0) {
      alert("Please select at least one field of interest");
      return;
    }

    //const allLinksEmpty = linkInputs.every((link) => link.trim() === "");
    //if (allLinksEmpty) {
    //alert("Please enter at least one link.");
    //return;
    //}
    selectedFields.forEach((field) => payload.append("fields", field.value));
    const validLinks = linkInputs.filter(
      (link) => link.link.trim() !== "" && link.type.trim() !== ""
    );
    payload.append("links", JSON.stringify(validLinks));

    for (let pair of payload.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/profile/",
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const profileId = response.data.id;
      localStorage.setItem("profileId", profileId);
      navigate("/profile/${profileId}");
      alert("Profile created!");
      console.log(profileId);
    } catch (err) {
      console.error("Submission error:", err);
    }

    console.log("Final links:", JSON.stringify(validLinks));
    console.log(
      "Final fields:",
      selectedFields.map((f) => f.value)
    );
  };

  //Used ChatGpt to better render an image behind the form//

  const formContainerStyle = {
    position: "relative",
    width: "100%",
    maxWidth: "2000px",
    margin: "2rem auto",
    borderRadius: "12px",
    overflow: "hidden",
  };

  const backgroundImgStyle = {
    opacity: 0.4,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  };

  const formStyle = {
    position: "relative",
    zIndex: 2,
    padding: "2rem",
    color: "white",
  };

  return (
    <div style={formContainerStyle}>
      <img src={backgroundImage} alt="background" style={backgroundImgStyle} />
      <div style={overlayStyle}></div>

      <form onSubmit={handleSubmit} style={formStyle}>
        <h1 className="text-3xl font-bold mb-4 text-center">Add a Profile</h1>
        <hr className="mb-4" />

        <div className="mb-3">
          <label className="form-label">
            Name:
            <input
              className="form-control bg-white text-black"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Bio:
            <input
              className="form-control bg-white text-black"
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Profile Picture:
            <input
              type="file"
              accept="image/*"
              name="image"
              className="form-control bg-white text-black"
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Select fields you take interest in:
            <Select
              isMulti
              className="form-control"
              options={options}
              onChange={setSelectedFields}
              value={selectedFields}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "white",
                  color: "white",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#424874",
                  color: "white",
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "black",
                }),
              }}
            />
          </label>
        </div>

        <div className="mb-3">
          {linkInputs.map((input, index) => (
            <div key={index} className="mb-2">
              <label className="form-label">
                Link {index + 1}:
                <input
                  type="url"
                  className="form-control bg-white text-black"
                  value={input.link}
                  onChange={(e) => handleLinkChange(index, e.target.value)}
                  style={{ margin: "10px" }}
                />
              </label>

              <label className="form-label" style={{ marginLeft: "10px" }}>
                Type:
                <Select
                  className="text-black"
                  value={optionsLinks.find(
                    (option) => option.value === input.type
                  )}
                  onChange={(selectedOption) =>
                    handleTypeChange(index, selectedOption?.value || "")
                  }
                  options={optionsLinks}
                  styles={{
                    container: (base) => ({ ...base, margin: "10px" }),
                  }}
                />
              </label>
            </div>
          ))}

          {linkInputs.length < 3 && (
            <button
              type="button"
              className="btn btn-outline-light mb-3"
              style={{ margin: "15px" }}
              onClick={() =>
                setLinkInputs([...linkInputs, { link: "", type: "" }])
              }
            >
              Add Another Link
            </button>
          )}
        </div>

        {linkInputs.length < 3 && (
          <button
            type="button"
            className="btn btn-outline-light mb-3"
            style={{ margin: "15px" }}
            onClick={addLinkInput}
          >
            Add Another Link
          </button>
        )}

        <button className="btn btn-primary w-full mt-4" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default CreateProfile;
