import createStore from './store';

const getEmptyBlock = (props) => ({
  ...props,
  type: 'block',
  children: [],
});

let blocks = [];

const enterBlock = (props) => {
  const block = getEmptyBlock(props);
  block.id = props.id || props.name;
  blocks.push(block);
  return block;
};

const exitBlock = () => blocks.pop();

/*
Instead of:
```
const block = enterBlock(props);
doSomething();
exitBlock();
```
We can write:
const block = newChildBlock(props, () => { doSomething });
*/
export const newChildBlock = (props, callback) => {
  enterBlock(props);
  callback();
  return exitBlock();
};

// Used in our own tests when a test is testing a test.
// The inner test goes on its own store so we need blocks empty for that
export const newRootBlock = (props, callback) => {
  const oldBlocks = blocks;
  blocks = [];
  const block = newChildBlock(props, callback);
  blocks = oldBlocks;
  return block;
};

export const getCurrentBlock = () => blocks[blocks.length - 1];

export const addFramework = (framework) => {
  const block = getCurrentBlock();
  block.frameworks[framework.id] = framework;
};

export const addStep = (step) => {
  const block = getCurrentBlock();
  block.children.push(step);
};

export const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const defaultOptions = {
  consoleLogger: true,
  recordActions: false,
  rethrow: false,
  bail: false,
};

export const createSuite = (inOptions = {}) => {
  const options = {
    ...defaultOptions,
    ...inOptions,
  };

  return createStore(options);
};
