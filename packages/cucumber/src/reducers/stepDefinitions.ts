import produce from 'immer';

const initialState = [];

export default produce((stepDefinitions = initialState, action) => {
  switch (action.type) {
    case 'stepDefinitions/set': {
      return action.stepDefinitions;
    }

    default:
      return stepDefinitions;
  }
});
