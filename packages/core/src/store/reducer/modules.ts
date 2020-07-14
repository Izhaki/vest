const initialState = {};

export default (modules = initialState, action) => {
  switch (action.type) {
    case 'importDone': {
      return {
        ...modules,
        ...action.updatedModules,
      };
    }
    default:
  }
  return modules;
};
