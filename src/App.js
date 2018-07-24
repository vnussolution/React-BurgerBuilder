import React, { Component } from "react";
import "./App.css";
import Layout from "./hoc/layout/layout";
import BurgerBuider from "./containers/burgerBuilder/BurgerBuilder";
import CheckOutSummary from "./containers/checkOut/checkOut";
import Orders from "./containers/orders/orders";
import Logout from "./containers/auth/logout/logout";
import Auth from "./containers/auth/auth";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/burger-builder" component={BurgerBuider} />
            <Route path="/checkout" component={CheckOutSummary} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={Auth} />
            <Route component={BurgerBuider} />
          </Switch>
        </Layout>
      </div>
    );
  }
}
export default App;
