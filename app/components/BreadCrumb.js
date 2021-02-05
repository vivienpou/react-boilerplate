import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { NavLink } from 'react-router-dom';
import { purple } from '@material-ui/core/colors';
import HomeIcon from '@material-ui/icons/Home';
import { useLocation } from 'react-router';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      backgroundColor: purple,
      padding: theme.spacing(2),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),
    },
  }),
);

export default function CustomSeparator() {
  const classes = useStyles();
  const location = useLocation();
  return (
    <div className={classes.root}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <NavLink color="inherit" to="/" activeStyle={{ color: 'red' }}>
          <HomeIcon />
        </NavLink>
        {location.pathname === '/admin-users' ? (
          <NavLink
            color="inherit"
            to="/admin-users"
            activeStyle={{ color: 'red' }}
          >
            Users
          </NavLink>
        ) : null}
        {location.pathname === '/admin-products' ? (
          <NavLink
            color="inherit"
            to="/admin-products"
            activeStyle={{ color: 'red' }}
          >
            Products
          </NavLink>
        ) : null}
      </Breadcrumbs>
    </div>
  );
}
