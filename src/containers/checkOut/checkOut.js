import React, { Component } from "react";
import CheckOutSummary from "../../components/order/checkOutSummary/checkOutSummary";
import ContactData from "./ContactData/contactData";
import { Route } from "react-router-dom";
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
    return (
      <div>
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
}

const mapStateToProps = state => {
  return { _ings: state.ingredients };
};
export default connect(mapStateToProps)(CheckOut);
