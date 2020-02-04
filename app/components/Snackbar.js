import React from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types'; // ES6
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function SimpleSnackbar(props) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('default message');

  React.useEffect(() => {
    setOpen(props.opened);
    setMessage(props.message);
  }, [props]);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert severity={props.severity}>{message}</Alert>
      </Snackbar>
    </div>
  );
}

SimpleSnackbar.propTypes = {
  opened: PropTypes.bool,
  message: PropTypes.string,
  severity: PropTypes.string,
};
