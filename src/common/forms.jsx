import React, { Component } from "react";

import Input from "./input";
import Select from "./select";
import "./Forms.css";

class Forms extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const { data } = this.state;
    const errors = {};
    const { error } = this.schema.validate(data);
    if (!error) return null;
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const { error } = this.schema.validate({
      [name]: value
    });
    for (let item of error.details) {
      if (item.path[0] === name) {
        return item.message;
      }
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.doSubmit();
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} type="submit" className="submit">
        {label}
      </button>
    );
  };

  renderSelect = (label, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        options={options}
        value={data[label]}
        onChange={this.handleChange}
        label={label}
        error={errors[label]}
      />
    );
  };


  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        id={name}
        value={data[name]}
        name={name}
        onChange={this.handleChange}
        placeholder={label}
        error={errors[name]}
      />
    );
  };
}

export default Forms;
