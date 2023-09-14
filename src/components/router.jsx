import * as React from "react";
import { Switch, Route, Router } from "wouter";
import Home from "../pages/home";
import About from "../pages/about";

/**
* The router is imported in app.jsx
*/

export default () => {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
    <Switch>
      <Route path="/">
        <Home
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      </Route>
      <Route path="/about" component={About} />
    </Switch>
  );
}
