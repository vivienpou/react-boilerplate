import Button from '@material-ui/core/Button';
import React from 'react';
import PropTypes from 'prop-types'; // ES6

const MyButton = props => (
  <Button variant="contained" color="primary">
    {props.text}
  </Button>
);

MyButton.propTypes = { text: PropTypes.string };

export default MyButton;
