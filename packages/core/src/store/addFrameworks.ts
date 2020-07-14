import getReducer from './reducer';

const { keys } = Object;

const isFrameworksMissing = (store, neededFrameworks) => {
  const { frameworks: exisitngFrameworks } = store.getState();
  return keys(neededFrameworks).some(
    (neededFrameworkName) =>
      exisitngFrameworks[neededFrameworkName] === undefined
  );
};

const addFrameworks = (store, neededFrameworks) => {
  if (isFrameworksMissing(store, neededFrameworks)) {
    const { config, frameworks: existingFrameworks } = store.getState();
    const frameworks = { ...existingFrameworks, ...neededFrameworks };
    store.dispatch({ type: 'frameworks/set', frameworks });

    const reducer = getReducer(config, frameworks);
    store.replaceReducer(reducer);
  }
};

export default addFrameworks;
