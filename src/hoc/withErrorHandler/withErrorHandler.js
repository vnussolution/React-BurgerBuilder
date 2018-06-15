import React, { Component } from "react";
import Aux from "../aux/aux";
import Modal from "../../components/ui/modal/modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = { error: null };
    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      axios.interceptors.response.use(
        res => res,
        error => {
          // always return response so that it can continue
          this.setState({ error: error });
          console.log(
            "reponse with error:: ",
            error,
            " message:::",
            error.message
          );
        }
      );
    }

    closeModal = () => {
      this.setState({ error: null });
    };

    render() {
      const wrappedComponent = this.state.error ? null : (
        <WrappedComponent {...this.props} />
      );
      return (
        <Aux>
          <Modal show={this.state.error} toggle={this.closeModal}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          {wrappedComponent}
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
