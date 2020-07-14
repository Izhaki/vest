import {
  CucumberExpression,
  ParameterTypeRegistry,
} from '@cucumber/cucumber-expressions';
import { stepUpdated } from '@vest/core/store/actions';
import DataTable from './DataTable';
import reducers from './reducers';

const parameterTypeRegistry = new ParameterTypeRegistry();

const clone = (obj) => ({ ...obj });

const match = (text) => (stepDefinition) => {
  const expression = new CucumberExpression(
    stepDefinition.pattern,
    parameterTypeRegistry
  );
  return expression.match(text);
};

const getStepDefinition = (text, stepDefinitions) => {
  const matches = stepDefinitions.filter(match(text));
  if (matches.length === 0) {
    throw new Error(`No step definition found for "${text}"`);
  }
  if (matches.length > 1) {
    throw new Error(`Multiple step definitions found for "${text}"`);
  }
  return matches[0];
};

const isHook = (step) =>
  ['Before', 'After', 'BeforeAll', 'AfterAll'].includes(step.keyword);

const suiteHooksToSteps = (module, keyword, sort) =>
  (module.hooks || [])
    .filter((hook) => hook.keyword === keyword)
    .map((hook, index) => {
      const id = `${module.id} > ${keyword} ${index + 1}`;
      return { ...hook, id, sort };
    });

const reduceGlobals = (globals, module) => {
  if (module.stepDefinitions) {
    globals.stepDefinitions.push(...module.stepDefinitions);
  }
  if (module.hooks) {
    globals.hooks.push(...module.hooks);
  }
  return globals;
};

const framework = {
  id: 'cucumber',
  reducers,
  isContextRoot: (step) => step.keyword === 'Scenario',
  runStep(step, { getState, context }) {
    if (isHook(step)) {
      const arg = {};
      if (step.keyword === 'Before') {
        arg.pickle = {
          uri: step.breadcrumb[0],
          name: step.breadcrumb[2],
        };
      }
      return step.fn.call(context, arg);
    }
    const { stepDefinitions } = getState();
    const stepDefinition = getStepDefinition(step.name, stepDefinitions);
    const args = match(step.name)(stepDefinition);
    const parameters = args.map((arg) => arg.getValue());
    const argument =
      (step.docString && step.docString.content) ||
      (step.dataTable && new DataTable(step.dataTable));
    return stepDefinition.fn.call(context, ...parameters, argument);
  },
  shouldSkipOnFailure: (step) =>
    step.type === 'test' || ['BeforeAll', 'Before'].includes(step.keyword),
  transformModule(step, store) {
    const feature = step.children[0];
    if (feature && feature.keyword === 'Feature') {
      const { hooks = [] } = store.getState();
      const befores = hooks.filter((hook) => hook.keyword === 'Before');
      const afters = hooks.filter((hook) => hook.keyword === 'After');
      const scenarios = feature.children || [];
      scenarios.forEach((scenario) => {
        scenario.children = [
          ...befores.map(clone),
          ...scenario.children,
          ...afters.map(clone).reverse(),
        ];
      });
    }
    return step;
  },
  onAction: (store) => (action) => {
    if (action.type === 'importDone') {
      const { dispatch, getState } = store;
      const modules = Object.values(getState().modules);
      const { stepDefinitions, hooks } = modules.reduce(reduceGlobals, {
        stepDefinitions: [],
        hooks: [],
      });
      dispatch({ type: 'stepDefinitions/set', stepDefinitions });
      dispatch({ type: 'hooks/set', hooks });

      const updateStep = (step) => dispatch(stepUpdated(step));
      modules.forEach((module) => {
        suiteHooksToSteps(module, 'BeforeAll', -1).map(updateStep);
        suiteHooksToSteps(module, 'AfterAll', 1).map(updateStep);
      });
    }
  },
};

export default framework;
