import { setOpenSidebar } from "@/store/Slicer/openSidebarSlice";
import { useDispatch, useSelector } from "react-redux";

import youtubeLogo from "@/assets/logo.svg";
import menuIcon from "@/assets/hamburger.svg";
import "./NavStart.scss";

function NavStart() {
  const dispatch = useDispatch();
  const { openSidebar } = useSelector((state) => state.openSidebar);

  return (
    <div className="nav-start">
      <button
        className="menu"
        onClick={() => {
          dispatch(setOpenSidebar(!openSidebar));
        }}
      >
        <img src={menuIcon} alt="Menu" />
      </button>
      <a href="/" className="logo">
        <img src={youtubeLogo} alt="Youtube Logo" />
      </a>
    </div>
  );
}

export default NavStart;
