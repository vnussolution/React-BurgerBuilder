import React, { Component } from "react";
import Burger from "../../components/burger/burger";
import Aux from "../../hoc/aux/aux";
import BuildControls from "../../components/burger/buildControls/buildControls";
import Modal from "../../components/ui/modal/modal";
import OrderSummary from "../../components/burger/orderSummary/orderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/ui/spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import * as actionTypes from "../../store/actions/index";
import { connect } from "react-redux";

class BurgerBuilder extends Component {
  state = {
    showOrderSummary: false
    // loading: false,
    // error: false
  };

  componentDidMount = () => {
    // axios
    //   .get("https://react-burger-9c0ef.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     console.log(" componentDidMount Burgerbuilder: ");
    //     if (response)
    //       setTimeout(() => {
    //         this.setState({ ingredients: response.data });
    //         if (this.props._ingredients) {
    //           this.canPurchaseHandler();
    //         }
    //       }, 1111);
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //     console.log("componentDidMount :error:", error);
    //   });
    this.props.onInitIngredients();
  };

  toggleOrderSummary = () => {
    this.setState({ showOrderSummary: !this.state.showOrderSummary });
    console.log("showOrderSummary", this.state.showOrderSummary);
  };

  canPurchaseHandler = () => {
    // return true only if at least one ingredient is added
    const purchaseable =
      Math.max(...Object.values(this.props._ingredients)) > 0;
    return purchaseable;
  };

  // addIngredientHandler = type => {
  //   const oldCount = this.props._ingredients[type];
  //   const newCount = oldCount + 1;
  //   const updatedIngredients = { ...this.props._ingredients };
  //   updatedIngredients[type] = newCount;
  //   const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
  //   this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  //   this.canPurchaseHandler();
  // };

  // removeIngredientHandler = type => {
  //   const oldCount = this.props._ingredients[type];
  //   if (oldCount <= 0) return;
  //   const newCount = oldCount - 1;
  //   const updatedIngredients = { ...this.props._ingredients };
  //   updatedIngredients[type] = newCount;
  //   const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
  //   this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  //   this.canPurchaseHandler();
  // };

  purchaseContinueHandler = () => {
    this.props.history.push({ pathname: "/checkout" });
  };

  render() {
    const ingredients = { ...this.props._ingredients };
    const disabled = {};
    let orderSummary = <Spinner message=" posting order" />;
    let burgerControl = this.props._error ? (
      <h2>Problem with getting ingredients</h2>
    ) : (
      <Spinner message="getting ingredients" />
    );

    for (let ingKey in ingredients) {
      disabled[ingKey] = ingredients[ingKey] <= 0;
    }

    if (this.props._ingredients) {
      burgerControl = (
        <Aux>
          <Burger ingredients={this.props._ingredients} />
          <BuildControls
            addIngredient={this.props.onAddIngredient}
            removeIngredient={this.props.onRemoveIngredient}
            disabled={disabled}
            purchaseable={this.canPurchaseHandler()}
            price={this.props._price}
            orderNow={this.toggleOrderSummary}
          />
        </Aux>
      );
    }

    if (!this.state.loading) {
      orderSummary = (
        <OrderSummary
          ing={this.props._ingredients}
          cancel={this.toggleOrderSummary}
          continue={this.purchaseContinueHandler}
          price={this.props._price}
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

const mapStateToProps = state => {
  return {
    _ingredients: state.ingredients,
    _price: state.totalPrice,
    _error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ingredientName =>
      dispatch(actionTypes.addIngredient(ingredientName)),
    onRemoveIngredient: ingredientName =>
      dispatch(actionTypes.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actionTypes.initIngredients())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
