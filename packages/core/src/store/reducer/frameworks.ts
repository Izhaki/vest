const initialFrameworks = {};

export default (frameworks = initialFrameworks, action) => {
  switch (action.type) {
    case 'frameworks/set': {
      return action.frameworks;
    }
    default:
  }
  return frameworks;
};
