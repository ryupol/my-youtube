import SideLists from "../SideLists/SideLists";

import "./Sidebar.scss";

function Sidebar({ openSidebar, useModal }) {
  return (
    <div
      className={`sidebar${openSidebar && !useModal ? "" : " small-sidebar"}`}
    >
      <SideLists />
    </div>
  );
}

export default Sidebar;
