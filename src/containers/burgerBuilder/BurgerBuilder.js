import React, { Component } from "react";
import Burger from "../../components/burger/burger";
import Aux from "../../hoc/aux/aux";
import BuildControls from "../../components/burger/buildControls/buildControls";
import Modal from "../../components/ui/modal/modal";
import OrderSummary from "../../components/burger/orderSummary/orderSummary";

const INGREDIENTS_PRICE = { salad: 1, bacon: 0.7, cheese: 0.44, meat: 0.85 };

class BurgerBuilder extends Component {
  state = {
    ingredients: { salad: 0, bacon: 0, cheese: 0, meat: 0 },
    totalPrice: 4,
    purchaseable: false,
    showOrderSummary: false
  };

  toggleOrderSummary = () => {
    this.setState({ showOrderSummary: !this.state.showOrderSummary });
    console.log("showOrderSummary", this.state.showOrderSummary);
  };

  canPurchaseHandler = ing => {
    // return true only if at least one ingredient is added
    const purchaseable = Math.max(...Object.values(ing)) > 0;
    this.setState({ purchaseable });
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newCount;
    const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.canPurchaseHandler(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const newCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newCount;
    const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.canPurchaseHandler(updatedIngredients);
  };

  purchaseContinueHandler = () => {
    console.log("continue....");
  };

  render() {
    const ingredients = { ...this.state.ingredients };
    const disabled = {};

    for (let ingKey in ingredients) {
      disabled[ingKey] = ingredients[ingKey] <= 0;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <Modal
          show={this.state.showOrderSummary}
          toggle={this.toggleOrderSummary}
        >
          <OrderSummary
            ing={this.state.ingredients}
            cancel={this.toggleOrderSummary}
            continue={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabled}
          purchaseable={this.state.purchaseable}
          price={this.state.totalPrice}
          orderNow={this.toggleOrderSummary}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
