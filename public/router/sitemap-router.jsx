import React from "react";
import { Route } from "react-router";

export default (
  <Route>
    <Route path="/" />
    <Route path="/explore" />
    <Route path="/trending" />
    <Route path="/favourites" />
    <Route path="/top50" />
    <Route path="/search/:name" />

    <Route path="/category/:slug" />
    <Route path="/watch/:episode" />
    <Route path="/donate" />
    <Route path="/success" />
    <Route path="*" />
  </Route>
);
