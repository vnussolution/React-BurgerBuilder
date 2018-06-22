import React, { Component } from "react";
import CheckOutSummary from "../../components/order/checkOutSummary/checkOutSummary";

class CheckOut extends Component {
  state = { ingredients: { salad: 1, meat: 1, cheese: 1, bacon: 1 } };

  cancel = () => {
    console.log("cancel");
    this.props.history.goBack();
  };

  continue = () => {
    console.log(
      "continue",
      this.props,
      JSON.parse(this.props.match.params.ingredients)
    );
    // this.props.history.replace("/checkout/submit");
  };
  componentWillMount = () => {
    this.setState({
      ingredients: JSON.parse(this.props.match.params.ingredients)
    });
  };
  render() {
    return (
      <div>
        <CheckOutSummary
          ingredients={this.state.ingredients}
          cancelCheckOut={this.cancel}
          continueCheckOut={this.continue}
        />
      </div>
    );
  }
}

export default CheckOut;
