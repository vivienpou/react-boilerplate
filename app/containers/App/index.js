/* eslint-disable import/no-unresolved */
/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { Signin } from 'containers/Signin';
import { Signup } from 'containers/Signup';
import { AdminUsers } from 'containers/AdminUsers';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/admin-users" component={AdminUsers} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
