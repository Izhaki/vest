import { expect } from 'chai';
import { Before, Given, When, Then, addFeature } from '@vest/cucumber';
import { createSuite, newRootBlock } from '@vest/core';
import { importDone, runAll } from '@vest/core/store/actions';
import { getStepByBreadcrumb, getStepById } from '@vest/core/selectors';

const getStep = (state, breadcrumb) => {
  const step =
    breadcrumb.length > 1
      ? getStepByBreadcrumb(state, breadcrumb)
      : getStepById(state, breadcrumb[0]);
  if (step) {
    return step;
  }

  throw new Error(
    `Cannot find step with breadcrumb: ${breadcrumb.join(' > ')}`
  );
};

Before(function ({ pickle }) {
  const featureFile = pickle.uri
    .split('!')
    .pop()
    .replace('./packages/', '')
    .replace('tests/', '');
  const scenario = pickle.name;
  const id = [featureFile, scenario].join(' > ');
  this.suite = createSuite({
    id,
    consoleLogger: false,
    recordActions: true,
    autoRun: false,
  });

  this.modules = {};
});

Given('the following module named {string}:', function (moduleId, docString) {
  const isFeature = moduleId.endsWith('.feature');
  const currentModule = newRootBlock(
    {
      name: moduleId,
      id: moduleId,
    },
    () => {
      if (isFeature) {
        addFeature(docString);
      } else {
        // eslint-disable-next-line no-eval
        eval(docString);
      }
    }
  );

  this.modules[moduleId] = currentModule;
});

When('I run the suite', async function () {
  const { dispatch } = this.suite;

  try {
    dispatch(importDone(this.modules));
    this.modules = {};
    await dispatch(runAll());
  } catch (error) {
    this.thrown = error;
  }
});

Then('it should pass', function () {
  const { steps } = this.suite.getState();
  const allPassed = steps.every(({ result }) => result === 'passed');
  expect(allPassed).to.equal(true);
});

Then('the result for the following steps should be {string}:', function (
  expectedResult,
  dataTable
) {
  const state = this.suite.getState();
  const results = dataTable
    .raw()
    .map((row) => row[0])
    .map((str) => str.split(' > '))
    .map((breadcrumb) => getStep(state, breadcrumb))
    .map((step) => step.result);

  expect(results.every((result) => result === expectedResult)).to.be.true;
});
