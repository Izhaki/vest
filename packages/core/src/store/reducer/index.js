import { combineReducers } from 'redux';

import config from './config';
import frameworksReducer from './frameworks';
import modules from './modules';
import steps from './steps';
import stats from './stats';
import actionLog from './actionLog';

const { values, assign } = Object;

const addFrameworksReducers = (reducers, frameworks) => {
  values(frameworks).forEach(({ reducers: frameworkReducers = {} }) => {
    assign(reducers, frameworkReducers);
  });
};

export default function getReducer(options, frameworks = {}) {
  const reducers = {
    config,
    frameworks: frameworksReducer,
    modules,
    steps,
    stats,
  };
  addFrameworksReducers(reducers, frameworks);

  if (options.recordActions) {
    reducers.actionLog = actionLog;
  }
  return combineReducers(reducers);
}
