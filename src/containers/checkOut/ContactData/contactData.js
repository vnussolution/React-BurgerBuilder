import React, { Component } from "react";
import Button from "../../../components/ui/button/button";
import classes from "./contactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/ui/spinner/spinner";
import Input from "../../../components/ui/input/input";
class contactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "your name" },
        value: "",
        validation: { required: true },
        errorMessage: "",
        touched: false
      },
      email: {
        elementType: "email",
        elementConfig: { type: "text", placeholder: "your email" },
        value: "",
        validation: { required: true },
        errorMessage: "",
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "your street" },
        value: "",
        validation: { required: true },
        errorMessage: "",
        touched: false
      },
      zip: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Zipcode" },
        value: "",
        validation: { required: true, minLength: 3, maxLength: 5 },
        errorMessage: "",
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: " country" },
        value: "",
        validation: { required: true },
        errorMessage: "",
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "normal", displayValue: "Normal" },
            { value: "slowest", displayValue: "Slowest" }
          ]
        },
        errorMessage: "",
        value: "fastest",
        validation: {},
        touched: true
      }
    },
    formIsValid: false,
    touchedAll: false,
    loading: false
  };

  checkValidity(identifier, value, rules) {
    let isValid = true;
    let message = "";

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
      if (!isValid) {
        message += `${identifier} is required. `;
      }
    }

    if (rules.minLength) {
      isValid = value.length > rules.minLength && isValid;
      if (value.length < rules.minLength) {
        message += `${identifier}'s minLength is ${rules.minLength}. `;
      }
    }

    if (rules.maxLength) {
      isValid = value.length < rules.maxLength && isValid;
      if (value.length > rules.maxLength) {
        message += `${identifier}'s maxLength is ${rules.maxLength}.`;
      }
    }
    return message;
  }

  touchedAllFields() {
    let touched = true;
    for (let key in this.state.orderForm) {
      touched = this.state.orderForm[key].touched && touched;
    }
    return touched;
  }

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });

    const formData = {};

    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const data = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };

    axios
      .post("/orders.json", data)
      .then(response => {
        console.log("formdata", this.state.orderForm);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };
  changeHandler = (event, identifier) => {
    // deep clone in reactjs
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[identifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.errorMessage = this.checkValidity(
      identifier,
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[identifier] = updatedFormElement;
    updatedFormElement.touched = true;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid =
        !updatedOrderForm[inputIdentifier].errorMessage && formIsValid;
    }
    console.log(this.state.touchedAll, this.state.formIsValid);

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
      touchedAll: this.touchedAllFields()
    });
  };

  render() {
    const formElementArray = [];

    for (let key in this.state.orderForm) {
      formElementArray.push({ id: key, config: this.state.orderForm[key] });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(e => (
          <Input
            key={e.id}
            elementtype={e.config.elementType}
            elementconfig={e.config.elementConfig}
            value={e.config.value}
            errorMessage={e.config.errorMessage}
            touched={e.config.touched}
            shouldValidate={e.config.validation}
            changed={event => this.changeHandler(event, e.id)}
          />
        ))}

        <Button
          btnType="Success"
          disabled={!this.state.formIsValid || !this.state.touchedAll}
        >
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
