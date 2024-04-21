import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useClickOutside from "@/hooks/useClickOutside";
import NavStart from "../Navbar/NavStart/NavStart";
import SideLists from "../SideLists/SideLists";
import { setOpenSideModal } from "@/store/Slicer/openSideModalSlice";
import "./SideModal.scss";

function SideModal({ useModal }) {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const { openSideModal } = useSelector((state) => state.openSideModal);
  useClickOutside(modalRef, () => dispatch(setOpenSideModal(false)));

  const handleClick = () => {
    dispatch(setOpenSideModal(false));
  };
  return (
    <>
      <div className={`modal${openSideModal && useModal ? " open" : ""}`} ref={modalRef}>
        <NavStart handleClick={handleClick} />
        <div className="side-modal">
          <SideLists />
        </div>
      </div>
      <div className={openSideModal && useModal ? "side-modal-open-bg" : ""}></div>
    </>
  );
}

export default SideModal;
