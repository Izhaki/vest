import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import runner from './runner';
import driverLink from './driverLink';
import frameworks from './frameworks';

const isClient = typeof window !== 'undefined';

const middleware = isClient ? [thunk, runner, frameworks, driverLink] : [];

export default (options) =>
  composeWithDevTools({ name: options.id })(applyMiddleware(...middleware));
