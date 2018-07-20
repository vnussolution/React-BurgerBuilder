import React, { Component } from "react";
import Input from "../../components/ui/input/input";
import Button from "../../components/ui/button/button";
import classes from "./auth.css";

import Spiner from "../../components/ui/spinner/spinner";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

class auth extends Component {
  state = {
    authForm: {
      email: {
        elementType: "email",
        elementConfig: { type: "text", placeholder: "your email" },
        value: "",
        validation: { required: true, isEmail: true },
        errorMessage: "",
        touched: false
      },
      password: {
        elementType: "password",
        elementConfig: { type: "password", placeholder: "your password" },
        value: "",
        validation: { required: true, minLength: 6 },
        errorMessage: "",
        touched: false
      }
    },
    formIsValid: false,
    touchedAll: false,
    newUser: false
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

    if (rules.isEmail) {
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
    for (let key in this.state.authForm) {
      touched = this.state.authForm[key].touched && touched;
    }
    return touched;
  }
  changeHandler = (event, identifier) => {
    // deep clone in reactjs

    const updatedAuthForm = { ...this.state.authForm };
    const updatedFormElement = { ...updatedAuthForm[identifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.errorMessage = this.checkValidity(
      identifier,
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedAuthForm[identifier] = updatedFormElement;
    updatedFormElement.touched = true;

    let formIsValid = true;
    for (let inputIdentifier in updatedAuthForm) {
      formIsValid =
        !updatedAuthForm[inputIdentifier].errorMessage && formIsValid;
    }
    this.setState({
      authForm: updatedAuthForm,
      formIsValid: formIsValid,
      touchedAll: this.touchedAllFields()
    });
  };
  submitAuthForm = event => {
    event.preventDefault();
    this.props.onSubmit(
      this.state.authForm.email.value,
      this.state.authForm.password.value,
      this.state.newUser
    );
  };

  switchHandler = () => {
    this.setState(prevState => {
      return { newUser: !prevState.newUser };
    });
  };
  render() {
    const formElementArray = [];

    for (let key in this.state.authForm) {
      formElementArray.push({ id: key, config: this.state.authForm[key] });
    }

    let form = (
      <form onSubmit={this.submitAuthForm}>
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
        <Button btnType="Success"> Submit </Button>
      </form>
    );
    if (this.props._loading) {
      console.log("loading.....");
      form = <Spiner />;
    }
    let error = this.props._error ? <p> {this.props._error.message}</p> : null;
    console.log("error: ", this.props._error);
    return (
      <div className={classes.auth}>
        {error}
        {form}
        <Button btnType="Danger" clicked={this.switchHandler}>
          SWITCH TO {this.state.newUser ? "LOGIN" : "SIGN UP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    _error: state.auth.error,
    _loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (email, password, newUser) =>
      dispatch(actionCreators.authenticateAsync(email, password, newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(auth);
