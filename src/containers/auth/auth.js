import React, { Component } from "react";
import Input from "../../components/ui/input/input";
import Button from "../../components/ui/button/button";
import classes from "./auth.css";

import Spiner from "../../components/ui/spinner/spinner";
import { Redirect } from "../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-router-dom";
import { connect } from "../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-redux";
import * as actionCreators from "../../store/actions";
// import { checkValidity } from "../../shared/utility";

class auth extends Component {
  state = {
    authForm: {
      email: {
        elementType: "email",
        elementConfig: { type: "text", placeholder: "your email" },
        value: "frank3@frank.com",
        validation: { required: true, isEmail: true },
        errorMessage: "",
        touched: false
      },
      password: {
        elementType: "password",
        elementConfig: { type: "password", placeholder: "your password" },
        value: "frankie",
        validation: { required: true, minLength: 6 },
        errorMessage: "",
        touched: false
      }
    },
    formIsValid: false,
    touchedAll: false,
    newUser: true
  };

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

  componentDidUpdate() {
    // console.log("logged out");
  }
  componentDidMount() {
    if (!this.props._buildingBurger && this.props._authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }
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
      form = <Spiner />;
    }
    let error = this.props._error ? <p> {this.props._error.message}</p> : null;
    const loginRedirect = this.props._authenticated ? (
      <Redirect to={this.props._authRedirectPath} />
    ) : null;
    return (
      <div className={classes.auth}>
        {loginRedirect}
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
    _loading: state.auth.loading,
    _authenticated: state.auth.token !== null,
    _buildingBurger: state.burgerBuilder.building,
    _authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (email, password, newUser) =>
      dispatch(actionCreators.authenticateAsync(email, password, newUser)),
    onSetAuthRedirectPath: () =>
      dispatch(actionCreators.setAuthRedirectPath("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(auth);
