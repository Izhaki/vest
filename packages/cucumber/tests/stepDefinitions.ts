import { expect } from 'chai';
import { addGlobals, addFrameworks } from '@vest/core';
import * as cucumber from '@vest/cucumber';
import framework from '@vest/cucumber/framework';
import 'test/stepDefinitions';

const { BeforeAll, AfterAll, Before } = cucumber;

let reinstateOldGlobals;

BeforeAll(() => {
  reinstateOldGlobals = addGlobals({ ...cucumber, expect });
});

AfterAll(() => {
  reinstateOldGlobals();
});

Before(function () {
  // Because we don't currently import cucumber in the test script, we have to manually add it here.
  addFrameworks(this.suite, { cucumber: framework });
});
