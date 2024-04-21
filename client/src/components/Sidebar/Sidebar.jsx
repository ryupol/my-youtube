import { useSelector } from "react-redux";
import SideLists from "../SideLists/SideLists";

import "./Sidebar.scss";

function Sidebar({ useModal }) {
  const { openSidebar } = useSelector((state) => state.openSidebar);
  return (
    <div className={`sidebar${openSidebar && !useModal ? "" : " small-sidebar"}`}>
      <SideLists />
    </div>
  );
}

export default Sidebar;
