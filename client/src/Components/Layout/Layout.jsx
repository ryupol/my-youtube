import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import SideModal from "../SideModal/SideModal";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

import "./Layout.scss";

function Layout() {
  const ref = useRef(null);
  const { openSidebar } = useSelector((state) => state.openSidebar);
  const [useModal, setUseModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 1275) {
        setUseModal(true);
      } else {
        setUseModal(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="layout" ref={ref}>
      <Navbar />
      <Sidebar openSidebar={openSidebar} useModal={useModal} />
      <SideModal openSidebar={openSidebar} useModal={useModal} />
      <div
        className={`content${openSidebar && !useModal ? "" : " large-content"}`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
