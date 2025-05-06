import React from "react";

const Button = ({ text, onClick, className, disabled }) => {
  return (
    <button 
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
export default React.memo(Button);
