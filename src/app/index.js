import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./routes/home";
import About from "./routes/about";

document.title = "react app";

export const Routes = () => (
  <Switch>
    <Route path="/accueil" exact strict component={Home} />
    <Route path="/a-propos-de-nous" exact strict component={About} />
  </Switch>
);
