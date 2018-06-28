import React, { Component } from "react";
import Button from "../../../components/ui/button/button";
import classes from "./contactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/ui/spinner/spinner";
class contactData extends Component {
  state = {
    name: "",
    email: "",
    address: { street: "", zip: "" },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();

    console.log("ContactData:: ", this.props);
    this.setState({ loading: true });
    const data = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        address: { country: "USA", street: "1514 beach blvd", zipcode: 92343 }
      }
    };

    axios
      .post("/orders.json", data)
      .then(response => {
        this.setState({ loading: false });
        // Helper.deplay(() => );
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };
  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your name" />
        <input type="email" name="email" placeholder="Your email" />
        <input type="text" name="street" placeholder="Your street" />
        <input type="text" name="zip" placeholder="Your zip" />

        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
        {true && <h1>show me</h1>}
        {false && <h1>hide me</h1>}
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.contactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default contactData;
