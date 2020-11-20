import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxilary";

const withErrorHandler = (WrapedComponent, axios) => {
  return class extends Component {
    state = { error: null };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} clicked={this.errorHandler}>
            Something went horribly wrong...
            <p>{this.state.error ? this.state.error.message : null}</p>
          </Modal>
          <WrapedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
