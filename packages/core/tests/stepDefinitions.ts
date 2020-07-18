import { expect } from 'chai';
import { addGlobals, addFrameworks } from '@vest/core';
import { setConfig } from '@vest/core/store/actions';
import { BeforeAll, AfterAll, Before, Given, Then } from '@vest/cucumber';
import * as mocha from '@vest/mocha';
import framework from '@vest/mocha/framework';
import 'test/stepDefinitions';

let reinstateOldGlobals;

BeforeAll(() => {
  reinstateOldGlobals = addGlobals({ ...mocha, expect });
});

AfterAll(() => {
  reinstateOldGlobals();
});

Before(function () {
  // Because we don't currently import mocha in the test script, we have to manually add it here.
  addFrameworks(this.suite, { mocha: framework });
});

Given('a suite with the following options:', function (docString) {
  const options = JSON.parse(docString);

  // Set the config
  this.suite.dispatch(setConfig(options));
});

Then('it should throw', function () {
  expect(this.thrown).to.exist;
});
