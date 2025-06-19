import React from "react";

const LinkLogos = ({ link, type }) => {
  if (type === "linkedin") {
    return (
      <a href={link}>
        <img className="display-logos" src="/assets/linkedInLogo.png"></img>
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
        <img className="display-logos" src="/assets/facebookLogo.png"></img>
      </a>
    );
  } else if (type === "personal website") {
    return (
      <a href={link}>
        <img className="display-logos" src="/assets/personalWebsite.png"></img>
      </a>
    );
  } else if (type === "resume") {
    return (
      <a href={link}>
        <img className="display-logos" src="/assets/resumeLogo.png"></img>
      </a>
    );
  } else if (type === "github") {
    return (
      <a href={link}>
        <img className="display-logos" src="/assets/gitLogo.png"></img>
      </a>
    );
  }
};

export default LinkLogos;
