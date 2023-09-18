import React from "react";

function Button({ children, className = "", onClick }) {
  return (
    <button
    onClick={onClick}
      className={`${className} h-12 cursor-pointer justify-center items-center rounded-md bg-blue-500 hover:bg-blue-700 py-1 px-5 text-sm font-medium tracking-wide text-white transition-all`}
    >
      {children}
    </button>
  );
}

export default Button;
