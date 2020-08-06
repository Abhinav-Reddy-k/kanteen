import React from "react";
import { connect } from "react-redux";

import Forms from "../../common/forms";
import { login } from "../../services/authService";
import { getCurrentUser } from "../../services/authService";
import { toast, ToastContainer } from "react-toastify";
import { Redirect } from "react-router-dom";
const Joi = require("@hapi/joi");

class LoginForm extends Forms {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    email: Joi.string().required().label("email"),
    password: Joi.string().required().min(3).label("Password"),
  }).options({ abortEarly: false });

  doSubmit = async () => {
    let { email, password } = this.state.data;
    try {
      await login(email, password);
      toast.info("You as successfully logged In");
      // const { state } = this.props.location;
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        toast.info("Please try again...");
        this.setState({ errors });
      }
    }
  };

  render() {
    if (getCurrentUser()) return <Redirect to={"/"} />;
    return (
      <div className="col-6 container">
        <h1 className="bm">Login Page</h1>
        <ToastContainer />
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default connect()(LoginForm);
