import React, { Component } from "react";
import "./App.css";
import Layout from "./hoc/layout/layout";
import BurgerBuider from "./containers/burgerBuilder/BurgerBuilder";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <BurgerBuider />
        </Layout>
      </div>
    );
  }
}
export default App;
