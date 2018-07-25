import React, { Component } from "react";
import "./App.css";
import Layout from "./hoc/layout/layout";
import BurgerBuider from "./containers/burgerBuilder/BurgerBuilder";
// import CheckOutSummary from "./containers/checkOut/checkOut";
// import Orders from "./containers/orders/orders";
import Logout from "./containers/auth/logout/logout";
// import Auth from "./containers/auth/auth";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const AsyncCheckOut = asyncComponent(() => {
  return import("./containers/checkOut/checkOut");
});
const AsyncOrders = asyncComponent(() => {
  return import("./containers/orders/orders");
});
const AsyncAuth = asyncComponent(() => {
  return import("./containers/auth/auth");
});

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/burger-builder" component={BurgerBuider} />
        <Route path="/auth" component={AsyncAuth} />
        <Route path="/" exact component={BurgerBuider} />
        <Redirect to="/" /> {/* handle any wrong url by redirecting to / */}
      </Switch>
    );

    if (this.props._authenticated) {
      routes = (
        <Switch>
          <Route path="/burger-builder" component={BurgerBuider} />
          <Route path="/checkout" component={AsyncCheckOut} />
          <Route path="/orders" component={AsyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={AsyncAuth} />
          <Route path="/" exact component={BurgerBuider} />
          <Redirect to="/" /> {/* handle any wrong url by redirecting to / */}
        </Switch>
      );
    }

    return (
      <div className="App">
        <Layout>{routes} </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { _authenticated: state.auth.token !== null };
};

const mapDispatchToProps = dispatch => {
  return { autoLogin: () => dispatch(actionCreators.checkAuthentication()) };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
