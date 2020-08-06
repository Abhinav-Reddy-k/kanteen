import React from "react";

import LoginForm from "./features/loginPage/login";
import { Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Route path="/login" component={LoginForm} />
    </div>
  );
}

export default App;
