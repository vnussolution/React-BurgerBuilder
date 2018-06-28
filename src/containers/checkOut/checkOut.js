import React, { Component } from "react";
import CheckOutSummary from "../../components/order/checkOutSummary/checkOutSummary";
import ContactData from "./ContactData/contactData";
import { Route } from "react-router-dom";

class CheckOut extends Component {
  state = { ingredients: null, totalPrice: 0 };

  cancel = () => {
    console.log("cancel");
    this.props.history.goBack();
  };

  continue = () => {
    this.props.history.replace(`${this.props.match.path}/contact-data`);
  };
  componentDidMount() {
    // this.setState({
    //   ingredients: JSON.parse(this.props.match.params.ingredients)
    // });
    const query = new URLSearchParams(this.props.location.search);
    const ing = {};
    let price = 0;
    for (let param of query.entries()) {
      // [['salad':'1'],['meat':'2']]
      if (param[0] === "price") {
        price = param[1];
      } else ing[param[0]] = +param[1];
    }
    this.setState({ ingredients: ing, totalPrice: price });
  }
  render() {
    return (
      <div>
        <CheckOutSummary
          ingredients={this.state.ingredients}
          cancelCheckOut={this.cancel}
          continueCheckOut={this.continue}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              {...props}
              price={this.state.totalPrice}
            />
          )}
        />
      </div>
    );
  }
}

export default CheckOut;
