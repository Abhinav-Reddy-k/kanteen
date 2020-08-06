import React from "react";
import { getCurrentUser } from "./../../services/authService";
import { Redirect } from "react-router-dom";

const HomePage = () => {
  if (!getCurrentUser()) return <Redirect to={"/login"} />;
  return <div>Welcome to kmit kanteen....</div>;
};

export default HomePage;
