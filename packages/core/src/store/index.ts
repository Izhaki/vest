import { createStore } from 'redux';
import middleware from './middleware';
import getReducer from './reducer';
import { setConfig } from './actions';

export default (options) => {
  const store = createStore(getReducer(options), middleware(options));
  store.dispatch(setConfig(options));
  return store;
};
