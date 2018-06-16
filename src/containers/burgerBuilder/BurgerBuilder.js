import React, { Component } from "react";
import Burger from "../../components/burger/burger";
import Aux from "../../hoc/aux/aux";
import BuildControls from "../../components/burger/buildControls/buildControls";
import Modal from "../../components/ui/modal/modal";
import OrderSummary from "../../components/burger/orderSummary/orderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/ui/spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENTS_PRICE = { salad: 1, bacon: 0.7, cheese: 0.44, meat: 0.85 };

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    showOrderSummary: false,
    loading: false,
    error: false
  };

  componentDidMount = () => {
    axios
      .get("https://react-burger-9c0ef.firebaseio.com/ingredients.json")
      .then(response => {
        console.log(" componentDidMount Burgerbuilder: ");
        if (response)
          setTimeout(() => {
            this.setState({ ingredients: response.data });
          }, 1111);
      })
      .catch(error => {
        this.setState({ error: true });
        console.log("componentDidMount :error:", error);
      });
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
    this.setState({ loading: true });

    console.log("continue....");

    const data = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        address: { country: "USA", street: "1514 beach blvd", zipcode: 92343 }
      }
    };

    axios
      .post("/orders.json1", data)
      .then(response => {
        console.log("post order: ", response);
        setTimeout(() => {
          this.setState({ loading: false, showOrderSummary: false });
          console.log("bbb");
        }, 2222);
      })
      .catch(error => {
        console.log("post order error: ", error);
        this.setState({ loading: false, showOrderSummary: false });
      });
    console.log("aaaa");
  };

  render() {
    const ingredients = { ...this.state.ingredients };
    const disabled = {};
    let orderSummary = <Spinner message=" posting order" />;
    let burgerControl = this.state.error ? (
      <h2>Problem with getting ingredients</h2>
    ) : (
      <Spinner message="getting ingredients" />
    );

    for (let ingKey in ingredients) {
      disabled[ingKey] = ingredients[ingKey] <= 0;
    }

    if (this.state.ingredients) {
      burgerControl = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
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

    if (!this.state.loading) {
      orderSummary = (
        <OrderSummary
          ing={this.state.ingredients}
          cancel={this.toggleOrderSummary}
          continue={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.showOrderSummary}
          toggle={this.toggleOrderSummary}
        >
          {orderSummary}
        </Modal>
        {burgerControl}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
