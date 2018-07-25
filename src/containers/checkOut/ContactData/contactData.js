import React, { Component } from "react";
import Button from "../../../components/ui/button/button";
import classes from "./contactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/ui/spinner/spinner";
import Input from "../../../components/ui/input/input";
import { connect } from "../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../../store/actions";

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
    touchedAll: false
  };

  checkValidity(identifier, value, rules) {
    // console.log("check checkValidity");

    let isValid = true;
    let message = "";

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
      if (!isValid) {
        message += `${identifier} is required. `;
      }
    }

    if (rules.minLength) {
      // console.log("check minlength");

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

    if (rules.isEmail) {
      // console.log("check email1");
      // isValid = value.length < rules.maxLength && isValid;
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
      if (!isValid) {
        message += ` ${identifier} is not correct`;
      }
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
      if (!isValid) {
        message += ` ${identifier} is not a number`;
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
      ingredients: this.props._ings,
      price: this.props._price,
      orderData: formData,
      userId: this.props._userId
    };

    // axios
    //   .post("/orders.json", data)
    //   .then(response => {
    //     console.log("formdata", this.state.orderForm);
    //     this.setState({ loading: false });
    //     this.props.history.push("/");=
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false });
    //   });

    this.props.onPurchaseBurger(data, this.props._token);
    // console.log("userid.....", data.userId);
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
    if (this.props._loading) {
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

const mapStateToProps = state => {
  // console.log(" contactData : mapStateToProps", state);
  return {
    _ings: state.burgerBuilder.ingredients,
    _price: state.burgerBuilder.totalPrice,
    _loading: state.order.loading,
    _token: state.auth.token,
    _userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseBurger: (data, token) =>
      dispatch(actionTypes.purchaseBurgerAsync(data, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(contactData, axios));
