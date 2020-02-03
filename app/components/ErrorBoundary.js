import React, { Fragment, Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types'; // ES6

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: '',
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState((prevState, props) => ({
      error: prevState.error + error,
    }));
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    // setState remaining
  };

  render() {
    // You can render any custom fallback UI
    if (this.state.hasError) {
      return (
        <Fragment>
          {this.state.error === null && this.props.children}
          <Snackbar
            className=" toto"
            open={Boolean(this.state.error)}
            message={this.state.error !== null && this.state.error.toString()}
            onClose={this.handleClose()}
          />
        </Fragment>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = { children: PropTypes.object };

export default ErrorBoundary;
