import React from "react";
import '../css/Login.css';
const Input = props => {
  //console.log(props.value);
  return (
    <div className="form-group">
      <input
        className="form-control"
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;