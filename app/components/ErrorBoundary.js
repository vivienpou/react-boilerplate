import React, { Fragment } from 'react';
import PropTypes from 'prop-types'; // ES6
import SimpleSnackbar from './Snackbar';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: '',
      opened: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState((prevState, props) => ({
      error: prevState.error + error,
      opened: !prevState.opened,
    }));
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ opened: false });
  };

  handleOpen = () => {
    if (this.state.error) {
      this.setState({
        opened: true,
      });
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <Fragment>
          {this.state.error === null && this.props.children}
          <SimpleSnackbar
            opened={this.state.opened}
            message={this.state.error !== null && this.state.error.toString()}
            severity="error"
          />
        </Fragment>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = { children: PropTypes.object };

export default ErrorBoundary;
