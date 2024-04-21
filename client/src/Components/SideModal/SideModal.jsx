import NavStart from "../Navbar/NavStart/NavStart";
import SideLists from "../SideLists/SideLists";
import "./SideModal.scss";

function SideModal({ openSidebar, useModal }) {
  return (
    <>
      <NavStart />
      <div
        className={`side-modal${
          !openSidebar && useModal ? "" : " side-modal-open"
        }`}
      >
        <SideLists />
        <div className="side-modal-bg"></div>
      </div>
    </>
  );
}

export default SideModal;
