import React, { Component } from "react";
import Burger from "../../components/burger/burger";
import Aux from "../../hoc/aux";

class BurgerBuilder extends Component {
  state = {
    ingredients: { salad: 1, bacon: 1, cheese: 1, meat: 3 }
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <div> Build controls </div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
