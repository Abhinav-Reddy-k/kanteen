import React from "react";

import LoginForm from "./features/stateless/login";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./features/stateless/register";
import Logout from "./features/stateless/logout";
import PageNotFound from "./features/stateless/pageNotFound";
import HomePage from "./features/homePage/homePage";
import NavBar from "./features/stateless/navbar";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      {/* <NavBar /> */}
      <main>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/pageNotFound" component={PageNotFound} />
          <Route path="/home" component={HomePage} />
          <Redirect from="/" exact to="/home" />
          <Redirect to="/pageNotFound" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
