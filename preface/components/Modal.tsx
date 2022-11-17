import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface IProps {
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal = (props: IProps) => {
  const modalDiv = document.querySelector("#_modal");
  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  const closeModal = () => {
    props.closeModal();
  };

  return (
    <>
      {modalDiv &&
        createPortal(
          <div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center "
            onClick={closeModal}
          >
            <div
              className="absolute bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-1 right-1 bg-transparent text-xl hover:cursor-pointer"
                onClick={closeModal}
              >
                ✖
              </button>
              {props.children}
            </div>
          </div>,
          modalDiv
        )}
    </>
  );
};

export default Modal;
