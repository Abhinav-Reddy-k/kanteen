import React from "react";
import { toast } from "react-toastify";
import { register } from "../../services/userService";
import Forms from "../../common/forms";
import "./Login.css";
const Joi = require("@hapi/joi");

class Register extends Forms {
  state = {
    data: { username: "", password: "", email: "" },
    errors: {}
  };

  schema = Joi.object({
    username: Joi.string().required().min(3).label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .label("Email")
  }).options({ abortEarly: false });

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/";
      toast.success(`Successfully added ${this.state.data.username}`);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("You already have an account");
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="main">
        <h1 className="bm sign m-4">Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
