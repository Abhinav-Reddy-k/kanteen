import React from "react";
import { connect } from "react-redux";

import Forms from "./../../common/forms";
import { login } from "../../services/authService";
import { gotUserDetails } from "./loginSlice";
import { getCurrentUser } from "./../../services/authService";
import { toast, ToastContainer } from "react-toastify";
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
      // toast.info("You as successfully logged In");
      // const { state } = this.props.location;
      // window.location = state ? state.from.pathname : "/";

      const user = getCurrentUser();
      console.log(user);
      this.props.gotUserDetails(user);
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
    return (
      <div className="col-6 container">
        {/* <ToastContainer /> */}

        <h1 className="bm">Login Page</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.entities.login,
});
const mapDispatchToProps = (dispatch) => ({
  gotUserdetails: (user) => dispatch(gotUserDetails(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
