import { expect } from 'chai';
import { addGlobals, addFrameworks } from '@vest/core';
import { BeforeAll, AfterAll, Before } from '@vest/cucumber';
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
