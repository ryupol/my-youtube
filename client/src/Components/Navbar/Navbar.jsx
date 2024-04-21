import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "@/store/Slicer/openSidebarSlice";
import { setOpenSideModal } from "@/store/Slicer/openSideModalSlice";

import NavStart from "./NavStart/NavStart";
import SearchInput from "./SearchInput/SearchInput";
import UserMenu from "./UserMenu/UserMenu";
import IconItem from "../IconItem/IconItem";

import BackArrowIcon from "@/assets/back-arrow.svg";
import "./Navbar.scss";
import { setNavSearch } from "../../store/Slicer/navSearchSlice";

function Navbar({ searchResize }) {
  const dispatch = useDispatch();
  const { openSidebar } = useSelector((state) => state.openSidebar);
  const { navSearch } = useSelector((state) => state.navSearch);

  const handleClick = () => {
    if (window.innerWidth < 1275) {
      dispatch(setOpenSideModal(true));
    } else {
      dispatch(setOpenSidebar(!openSidebar));
    }
  };

  return (
    <nav className="navbar">
      {navSearch ? (
        <div className="nav-search">
          <IconItem
            name={"Back"}
            icon={BackArrowIcon}
            callback={() => dispatch(setNavSearch(false))}
          />
          <SearchInput />
        </div>
      ) : (
        <>
          <NavStart handleClick={handleClick} />
          <SearchInput searchResize={searchResize} />
          <UserMenu searchResize={searchResize} />
        </>
      )}
    </nav>
  );
}

export default Navbar;
