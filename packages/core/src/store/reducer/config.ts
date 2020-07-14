const defaultConfig = {
  autoRun: true,
  rethrow: false,
  bail: false,
};

export default (config = defaultConfig, action) => {
  switch (action.type) {
    case 'config/set': {
      return {
        ...config,
        ...action.config,
      };
    }
    default:
  }
  return config;
};
