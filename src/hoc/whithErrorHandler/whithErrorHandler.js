import React from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxilary";
import useHttpErrorHandler from "../../hooks/http-error-handler";

const withErrorHandler = (WrapedComponent, axios) => {
  return props => {
    const [error, errorHandler] = useHttpErrorHandler(axios)
      return (
        <Aux>
          <Modal show={error} clicked={errorHandler}>
            Something went horribly wrong...
            <p>{error ? error.message : null}</p>
          </Modal>
          <WrapedComponent {...props} />
        </Aux>
      );
  };
};

export default withErrorHandler;
