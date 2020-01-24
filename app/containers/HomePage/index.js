/*
 * HomePage
 *
 * This is the first thing Products see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import MyButton from 'components/Button';
import messages from './messages';

export default function HomePage() {
  return (
    <div>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <MyButton text="create app model" />
    </div>
  );
}
