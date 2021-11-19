import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ItemForm from "./features/admin/itemForm";
import Cart from "./features/cart/cart";
import HomePage from "./features/homePage/homePage";
import LoginForm from "./features/stateless/login";
import Logout from "./features/stateless/logout";
import NavBar from "./features/stateless/navbar";
import PageNotFound from "./features/stateless/pageNotFound";
import Register from "./features/stateless/register";
import WishList from "./features/wishlist/wishlist";

import { getCurrentUser } from "./services/authService";
import orderPreview from "./features/order/orderPreview";

function App() {
  let user = "";
  user = getCurrentUser();
  return (
    <React.Fragment>
      {!user && <NavBar />}
      <main>
        <Switch>
          {/* <Route path="/home/orderPreview" component={orderPreview} /> */}
          <Route path="/register" component={Register} />
          <Route path="/login" component={LoginForm} />
          <Route path="/cart" component={Cart} />
          <Route path="/logout" component={Logout} />
          <Route path="/home/items/:id" component={ItemForm} />
          <Route path="/wishlist" component={WishList} />
          <Route path="/pageNotFound" component={PageNotFound} />
          <Route path="/home" component={HomePage} />
          <Redirect from="/" exact to="/home" />
          <Redirect to="/pageNotFound" />
        </Switch>
      </main>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
