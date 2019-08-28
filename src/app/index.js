import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./routes/home";

document.title = "react app";

export const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
  </Switch>
);
