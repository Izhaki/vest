import transformModule from './transformModule';

const framework = {
  id: 'mocha',
  runStep: (step, { context }) => step.fn.call(context),
  shouldSkipOnFailure: (step) =>
    ['before', 'beforeEach'].includes(step.keyword),
  transformModule,
};

export default framework;
