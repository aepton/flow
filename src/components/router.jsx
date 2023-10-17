import * as React from "react";
import { Switch, Route, useLocation, useParams } from "wouter";
import Home from "../pages/home";

export default () => {
  const [location, setLocation] = useLocation();
  console.log('location', location);

  const params = useParams();
  console.log('params', params);

  return (
    <Switch>
      <Route>
        <Home />
      </Route>
    </Switch>
  );
}
