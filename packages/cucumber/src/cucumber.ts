import {
  addFramework,
  getCurrentBlock,
  addStep,
  newChildBlock,
} from '@vest/core';
import framework from './framework';
import featureToAst from './featureToAst';

addFramework(framework);

const isFunction = (x) => typeof x === 'function';

export const addStepDefinition = (stepDefinition) => {
  const block = getCurrentBlock();
  block.stepDefinitions = block.stepDefinitions || [];
  block.stepDefinitions.push(stepDefinition);
};

export const addHook = (hook) => {
  const block = getCurrentBlock();
  block.hooks = block.hooks || [];
  block.hooks.push({
    ...hook,
    prefix: hook.keyword,
    showPrefixOnly: true,
    framework: 'cucumber',
  });
};

const defineStep = (keyword) => (pattern, args = {}) => {
  if (isFunction(args)) {
    addStepDefinition({
      keyword,
      pattern,
      fn: args,
      framework: 'cucumber',
    });
  } else {
    addStep({
      type: 'test',
      keyword,
      prefix: keyword,
      name: pattern,
      framework: 'cucumber',
      ...args,
    });
  }
};

export const Given = defineStep('Given');
export const When = defineStep('When');
export const Then = defineStep('Then');
export const Before = (fn) => {
  addHook({ type: 'hook', keyword: 'Before', fn });
};

export const After = (fn) => {
  addHook({ type: 'hook', keyword: 'After', fn });
};

export const BeforeAll = (fn) => {
  addHook({ type: 'hook', keyword: 'BeforeAll', fn });
};

export const AfterAll = (fn) => {
  addHook({ type: 'hook', keyword: 'AfterAll', fn });
};

export function Scenario({ name, description }, fn) {
  const block = newChildBlock(
    {
      keyword: 'Scenario',
      name,
      prefix: 'Scenario: ',
      description,
      runnable: true,
      framework: 'cucumber',
      counter: 'specs',
    },
    fn
  );
  addStep(block);
}

export function Feature({ name, description }, fn) {
  const block = newChildBlock(
    {
      keyword: 'Feature',
      name,
      description,
      runnable: true,
      framework: 'cucumber',
    },
    fn
  );
  addStep(block);
}

function addScenario(scenario) {
  const { steps } = scenario;
  Scenario(scenario, () => {
    steps.forEach(({ keyword, text, docString, dataTable }) => {
      defineStep(keyword)(text, { docString, dataTable });
    });
  });
}

export function addFeature(text) {
  const { feature } = featureToAst(text);

  Feature(feature, () => {
    feature.children.forEach(({ scenario }) => {
      if (scenario) {
        addScenario(scenario);
      }
    });
  });
}
