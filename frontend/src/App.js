import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import Results from "./components/Results";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/items/:id">
              <ProductDetail />
            </Route>
            <Route path="/items">
              <Results />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
