import React from "react";
import Header from "./Header";
const Layout = ({ children, profileId }) => {
  return (
    <div>
      <Header profileId={profileId} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
