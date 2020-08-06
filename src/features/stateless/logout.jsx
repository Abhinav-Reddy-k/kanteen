import React, { Component } from "react";
import { toast } from "react-toastify";

import { logout } from "../services/authService";

class Logout extends Component {
  componentDidMount() {
    logout();
    toast.info("You are Successfully logged out");
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
