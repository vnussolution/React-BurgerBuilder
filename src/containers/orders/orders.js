import React, { Component } from "react";
import Order from "../../components/order/order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/ui/spinner/spinner";

class orders extends Component {
  componentDidMount() {
    this.props.onFetchOrder();
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          ingredients={order.ingredients}
          key={order.key}
          price={order.price}
          deleteOrder={() => this.props.onDeleteOrder(order.key)}
        />
      ));
    }
    return <div> {orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrder: () => dispatch(actionTypes.fetchOrdersAsync()),
    onDeleteOrder: key => dispatch(actionTypes.deleteOrdersAsync(key))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(orders, axios));
