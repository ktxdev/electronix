function IconButton({ children, className, disabled=false, onClick }) {
  return (
    <button
      href="#"
      disabled={disabled}
      onClick={onClick}
      className={`flex justify-center items-center rounded-md w-10 h-10 text-center leading-[33px] border mr-2 last:mr-0 disabled:bg-gray-100 disabled:text-black disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export default IconButton;
