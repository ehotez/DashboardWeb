import React from "react";
import '../components/Input.css';
const Button = props => {
  return (
    <button
      onClick={props.action}
    >
      {props.title}
    </button>
  );
};

export default Button;