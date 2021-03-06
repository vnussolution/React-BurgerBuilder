import React, { Component } from "react";
import Order from "../../components/order/order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/ui/spinner/spinner";

class orders extends Component {
  componentDidMount() {
    this.props.onFetchOrder(this.props._token, this.props._userId);
  }
  render() {
    let orders = <Spinner key="123" />;
    if (!this.props._loading) {
      orders = this.props._orders.map(order => (
        <Order
          ingredients={order.ingredients}
          key={order.key}
          price={order.price}
          deleteOrder={() => this.props.onDeleteOrder(order.key)}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    _orders: state.order.orders,
    _loading: state.order.loading,
    _token: state.auth.token,
    _userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrder: (token, userId) =>
      dispatch(actionTypes.fetchOrdersAsync(token, userId)),
    onDeleteOrder: key => dispatch(actionTypes.deleteOrdersAsync(key))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(orders, axios));
