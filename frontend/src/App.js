import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Users from "./pages/users/Users";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            "hi"
            {/* <Dashboard /> */}
          </Route>
          <Route path="/users">
            <Users />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
