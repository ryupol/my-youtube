import SearchInput from "./SearchInput/SearchInput";
import UserMenu from "./UserMenu/UserMenu";

import youtubeLogo from "@/assets/logo.svg";
import menuIcon from "@/assets/hamburger.svg";
import "./Navbar.scss";

function Navbar({ sidebar, setSidebar }) {
  const handleMenuClick = () => {
    setSidebar(!sidebar);
  };

  return (
    <nav className="navbar">
      <div className="start">
        <button className="menu" onClick={handleMenuClick}>
          <img src={menuIcon} alt="Menu" />
        </button>
        <a href="/" className="logo">
          <img src={youtubeLogo} alt="Youtube Logo" />
        </a>
      </div>
      <SearchInput />
      <UserMenu />
    </nav>
  );
}

export default Navbar;
