import produce from 'immer';

const initialState = [];

export default produce((hooks = initialState, action) => {
  switch (action.type) {
    case 'hooks/set': {
      return action.hooks;
    }

    default:
      return hooks;
  }
});
