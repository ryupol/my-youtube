import youtubeLogo from "@/assets/logo.svg";
import menuIcon from "@/assets/hamburger.svg";
import "./NavStart.scss";

function NavStart({ handleClick }) {
  return (
    <div className="nav-start">
      <button className="menu" onClick={handleClick}>
        <img src={menuIcon} alt="Menu" />
      </button>
      <a href="/" className="logo">
        <img src={youtubeLogo} alt="Youtube Logo" />
      </a>
    </div>
  );
}

export default NavStart;
