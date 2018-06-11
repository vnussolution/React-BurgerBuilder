import React, { Component } from "react";
import classes from "./layout.css";
import Aux from "../aux/aux";
import Toolbar from "../../components/navigation/toolbar/toolbar";
import SideDrawer from "../../components/navigation/sideDrawer/sideDrawer";

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
        <Toolbar toggleMenu={this.toggleMenuHandler} />
        <SideDrawer
          show={this.state.showSideDrawer}
          close={this.closeSideDrawerHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
