/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import MyButton from 'components/Button';

import PrimarySearchAppBar from 'components/Header';
import messages from './messages';

export default function HomePage() {
  return (
    <div>
      <PrimarySearchAppBar />
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <MyButton text="create app model" />
    </div>
  );
}
