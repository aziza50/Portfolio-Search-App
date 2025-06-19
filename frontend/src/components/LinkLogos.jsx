import React from "react";

const LinkLogos = ({ link, type }) => {
  if (type === "linkedin") {
    return (
      <a href={link}>
        <img className="display-logos" src="/assets/linkedInLogo.webp"></img>
      </a>
    );
  } else if (type === "instagram") {
    return (
      <a href={link}>
        <img className="display-logos" src="/assets/instaLogo.webp"></img>
      </a>
    );
  } else if (type === "facebook") {
    return (
      <a href={link}>
        <img className="display-logos" src="/assets/facebookLog.png"></img>
      </a>
    );
  } else if (type === "personal website") {
    return <a href={link}>Personal Website</a>;
  } else if (type === "resume") {
    return <a href={link}>Resume</a>;
  } else if (type === "github") {
    return <img className="display-logos" src="/assets/gitLogo.png"></img>;
  }
};

export default LinkLogos;
