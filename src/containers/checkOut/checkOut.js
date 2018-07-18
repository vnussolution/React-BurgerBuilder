import React, { Component } from "react";
import CheckOutSummary from "../../components/order/checkOutSummary/checkOutSummary";
import ContactData from "./ContactData/contactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class CheckOut extends Component {
  cancel = () => {
    console.log("cancel");
    this.props.history.goBack();
  };

  continue = () => {
    this.props.history.replace(`${this.props.match.path}/contact-data`);
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props._ings) {
      const purchasedRedirect = this.props._purchased ? (
        <Redirect to="/" />
      ) : null;

      summary = (
        <div>
          {purchasedRedirect}
          <CheckOutSummary
            ingredients={this.props._ings}
            cancelCheckOut={this.cancel}
            continueCheckOut={this.continue}
          />
          <Route
            path={`${this.props.match.path}/contact-data`}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    _ings: state.burgerBuilder.ingredients,
    _purchased: state.order.purchased
  };
};
export default connect(mapStateToProps)(CheckOut);
