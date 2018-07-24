import React, { Component } from "react";
import classes from "./layout.css";
import Aux from "../aux/aux";
import Toolbar from "../../components/navigation/toolbar/toolbar";
import SideDrawer from "../../components/navigation/sideDrawer/sideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = { showSideDrawer: false };
  closeSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  toggleMenuHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          authenticated={this.props._isAuthenticated}
          toggleMenu={this.toggleMenuHandler}
        />
        <SideDrawer
          authenticated={this.props._isAuthenticated}
          show={this.state.showSideDrawer}
          close={this.closeSideDrawerHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return { _isAuthenticated: state.auth.token !== null };
};

export default connect(mapStateToProps)(Layout);
