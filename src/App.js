import React, { Component } from "react";
import "./App.css";
import Layout from "./hoc/layout/layout";
import BurgerBuider from "./containers/burgerBuilder/BurgerBuilder";
import CheckOutSummary from "./containers/checkOut/checkOut";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/burger-builder" component={BurgerBuider} />
            <Route path="/checkout/:ingredients" component={CheckOutSummary} />
            <Route path="/" component={BurgerBuider} />
          </Switch>
        </Layout>
      </div>
    );
  }
}
export default App;
