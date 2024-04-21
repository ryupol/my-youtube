import NavStart from "./NavStart/NavStart";
import SearchInput from "./SearchInput/SearchInput";
import UserMenu from "./UserMenu/UserMenu";

import "./Navbar.scss";

function Navbar() {
  return (
    <nav className="navbar">
      <NavStart />
      <SearchInput />
      <UserMenu />
    </nav>
  );
}

export default Navbar;
