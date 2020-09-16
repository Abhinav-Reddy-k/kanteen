import React from "react";

const Select = ({ label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <select name={label} id={label} {...rest} className="form-control">
        <option value="" />
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
