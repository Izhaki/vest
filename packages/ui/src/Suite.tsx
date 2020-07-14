import * as React from 'react';
import { Provider } from 'react-redux';
import withNoSSR from './withNoSSR';

function Suite({ suite, children }) {
  return <Provider store={suite}>{children}</Provider>;
}

export default withNoSSR(Suite);
