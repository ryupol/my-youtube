import { Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";

import "./Layout.scss";

function Layout() {
  const [sidebar, setSidebar] = useState(true);
  return (
    <div className="layout">
      <Navbar sidebar={sidebar} setSidebar={setSidebar} />
      <Sidebar sidebar={sidebar} />
      <div className={`content${sidebar ? '' : ' large-content'}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
