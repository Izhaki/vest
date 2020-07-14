import {
  createSuite as createCoreSuite,
  addFrameworks,
  newChildBlock,
} from '@vest/core';
import { importDone } from '@vest/core/store/actions';

const { isArray } = Array;
const ensureArray = (x) => (isArray(x) ? x : [x]);

const getFileName = (path) => path.split('/').pop();

export const addContext = (suite, context, updatedModules) => {
  context.keys().forEach((request) => {
    const id = context.resolve(request);
    // Modules are removed from the cache in hmr
    const changed = require.cache[id] === undefined;
    if (changed) {
      const currentModule = newChildBlock(
        {
          name: getFileName(id),
          id,
          runnable: true,
          counter: 'modules',
          frameworks: {},
        },
        () => {
          // This is equal to require(moduleName);
          // Modules that haven't updated under hmr will be read from cache and not execute
          context(request);
        }
      );

      addFrameworks(suite, currentModule.frameworks);
      updatedModules[id] = currentModule;
    }
  });
};

const suites = {};

export const createSuite = ({ modules, ...otherOptions }) => {
  const contexts = ensureArray(modules);

  const id = otherOptions.id || contexts[0].id;

  const options = {
    ...otherOptions,
    id,
  };

  // createSuite will be called whenever tests update. Only create a store if one doesn't exist already.
  suites[id] = suites[id] || createCoreSuite(options);
  const suite = suites[id];

  const updatedModules = {};

  contexts.forEach((context) => {
    addContext(suite, context, updatedModules);
  });

  suite.dispatch(importDone(updatedModules));
  return suite;
};
