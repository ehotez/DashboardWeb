import React from "react";
import '../css/Input.css';
const Button = props => {
  return (
    <button className="button"
      onClick={props.action}
    >
      {props.title}
    </button>
  );
};

export default Button;