import React, { Component } from "react";
import { Redirect } from "../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-router-dom";
import { connect } from "../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-redux";
import * as actions from "../../../store/actions";

class Logout extends Component {
  componentDidMount = () => {
    this.props.onLogout();
  };
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return { onLogout: () => dispatch(actions.logout()) };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
