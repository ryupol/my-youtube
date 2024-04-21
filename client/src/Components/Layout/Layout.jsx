import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setNavSearch } from "@/store/Slicer/navSearchSlice";
import SideModal from "../SideModal/SideModal";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

import "./Layout.scss";

function Layout() {
  const dispatch = useDispatch();
  const { openSidebar } = useSelector((state) => state.openSidebar);
  const [searchResize, setSearchResize] = useState(false);
  const [useModal, setUseModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1275) {
        setUseModal(true);
      } else {
        setUseModal(false);
      }

      // navbar
      if (width < 500) {
        setSearchResize(true);
      } else {
        dispatch(setNavSearch(false));
        setSearchResize(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="layout">
      <Navbar searchResize={searchResize} />
      <Sidebar useModal={useModal} />
      <SideModal useModal={useModal} />
      <div className={`content${openSidebar && !useModal ? "" : " large-content"}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
