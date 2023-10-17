import * as React from "react";
import { Switch, Route } from "wouter";
import Home from "../pages/home";

export default () => {
  const params = new URLSearchParams(window.location.search);

  return (
    <Switch>
      <Route>
        <Home round={params.get('round')} />
      </Route>
    </Switch>
  );
}
