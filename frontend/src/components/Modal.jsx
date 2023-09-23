import { useRef } from "react";

function Modal({ children, onClose }) {
    const modalDivRef = useRef();

    function handleClick(e) {
        if(e.target.id !== modalDivRef.current.id) {
            return;
        }

        onClose();
    }
  return (
    <div className="fixed z-50 bg-overlay top-0 left-0 mx-0 h-full w-full transition-all">
      <div ref={modalDivRef} id="modal" onClick={handleClick} className="flex justify-center items-center w-full h-full">
        {children}
      </div>
    </div>
  );
}

export default Modal;
