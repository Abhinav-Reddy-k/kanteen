import React from "react";
import "./Forms.css";

const Input = ({ error, ...rest }) => {
  return (
    <div className="form-group">
      <input
        {...rest}
        className="un"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
