import React, { Component } from "react";
import Order from "../../components/order/order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(res => {
        const fetchOrders = [];
        for (let key in res.data) {
          fetchOrders.push({ ...res.data[key], key: key });
        }
        this.setState({ loading: false, orders: fetchOrders });
        console.log("Orders : componentDidMount ,", res.data);
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log("Orders : componentDidMount , error:", err);
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            ingredients={order.ingredients}
            key={order.key}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(orders, axios);
