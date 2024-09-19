import { useContext } from "react";
import { createPortal } from "react-dom";
import Sidebar from "../Layout/Sidebar";
import context from "../../context/context";

const Backdrop = () => {
  const ctx = useContext(context);

  const categoryHandler = () => {
    ctx.setBackdrop(false);
    ctx.setSidebar(false);
  };

  return (
    ctx.showBackdrop && (
      <div
        onClick={categoryHandler}
        className="fixed inset-0 z-20 bg-black bg-opacity-75 cursor-pointer"
      ></div>
    )
  );
};

const portalElement = document.getElementById("portal");

const ModalOverlay = () => {
  return (
    <>
      {createPortal(<Backdrop />, portalElement)}
      {createPortal(<Sidebar />, portalElement)}
    </>
  );
};

export default ModalOverlay;
