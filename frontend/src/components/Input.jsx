import React from "react";

function Input({
  label = "",
  type = "text",
  name = '',
  placeholder = "",
  value = "",
  required = false,
  onChange = null,
}) {
  return (
    <div className="mb-5">
      <p className="mb-1 text-base text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      <input
        value={value}
        onChange={onChange}
        name={name}
        className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
