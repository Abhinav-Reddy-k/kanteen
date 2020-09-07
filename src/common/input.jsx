import React from "react";
import "./Forms.css";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <input
        {...rest}
        placeholder={label}
        name={name}
        id={name}
        className="un"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
