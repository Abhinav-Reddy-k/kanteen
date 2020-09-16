import React from "react";

import LoginForm from "./features/stateless/login";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./features/stateless/register";
import Logout from "./features/stateless/logout";
import PageNotFound from "./features/stateless/pageNotFound";
import HomePage from "./features/homePage/homePage";
import NavBar from "./features/stateless/navbar";
import ItemForm from "./features/admin/itemForm";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "./services/authService";

function App() {
  let user = "";
  user = getCurrentUser();
  return (
    <React.Fragment>
      <ToastContainer />
      {!user && <NavBar />}
      <main>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/items/:id" component={ItemForm} />
          <Route path="/pageNotFound" component={PageNotFound} />
          <Route path="/" component={HomePage} />
          {/* <Redirect from="/" exact to="/home" /> */}
          <Redirect to="/pageNotFound" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
