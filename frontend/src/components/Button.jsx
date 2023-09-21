import React from "react";

function Button({ children, className = "", type = "", disabled=false, onClick }) {
  let additionalStyles;
  switch (type) {
    case "primary":
      additionalStyles = "bg-blue-500 hover:bg-blue-700 text-white disabled:bg-blue-300";
      break;
    case "success":
      additionalStyles = "bg-green-500 hover:bg-green-700 text-white";
      break;
    default:
      additionalStyles = "bg-gray-200 hover:bg-gray-300 text-gray-700";
      break;
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${additionalStyles} h-12 cursor-pointer justify-center disabled:cursor-not-allowed items-center rounded-md  py-1 px-5 text-sm font-medium tracking-wide transition-all`}
    >
      {children}
    </button>
  );
}

export default Button;
