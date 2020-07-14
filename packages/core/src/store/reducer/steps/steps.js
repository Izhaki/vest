import produce from 'immer';
import { forEachDescendant } from '@vest/core/utils';
import addBreadcrumb from './addBreadcrumb';

const forEachAncestorAndSelf = (steps, step, callback) => {
  let match = {
    children: steps,
  };
  for (const id of step.breadcrumb) {
    match = match.children.find((child) => child.id === id);
    callback(match);
  }
};

const forEachLineageMember = (steps, step, callback) => {
  let current;

  forEachAncestorAndSelf(steps, step, (ancestor) => {
    callback(ancestor);
    current = ancestor;
  });

  forEachDescendant(current, callback);
};

const findStep = (steps, step) => {
  let match;
  forEachAncestorAndSelf(steps, step, (ancestor) => {
    match = ancestor;
  });
  return match;
};

const initialState = [];

const isHook = (step) => step.type === 'hook';

export default produce((steps = initialState, action) => {
  switch (action.type) {
    case 'step/updated': {
      const step = produce(action.step, addBreadcrumb);
      // Some other middleware may intercept the action, so we need to ensure
      // the step is transformed one.
      action.step = step;

      const index = steps.findIndex(({ id }) => id === step.id);
      if (index !== -1) {
        steps[index] = step;
      } else {
        steps.push(step);
      }

      break;
    }

    case 'steps/sort': {
      steps.sort((aStep, bStep) => {
        const aSort = aStep.sort || 0;
        const bSort = bStep.sort || 0;
        return aSort - bSort;
      });
      break;
    }

    case 'step/queueAll': {
      steps.forEach((step) => {
        step.status = 'queued';

        // Mark all descendants as queued
        forEachDescendant(step, (descendant) => {
          descendant.status = 'queued';
        });
      });

      break;
    }

    case 'step/queue': {
      // Mark all ancestors, self, and descendants as queued
      forEachLineageMember(steps, action.step, (member) => {
        member.status = 'queued';
      });

      // Mark all top level hooks.
      steps.filter(isHook).forEach((hook) => {
        hook.status = 'queued';
      });

      break;
    }

    case 'step/running': {
      const step = findStep(steps, action.step);
      delete step.result;
      step.status = 'running';
      break;
    }

    case 'step/skipped':
    case 'step/passed':
    case 'step/failed': {
      const { result } = action;

      const step = findStep(steps, action.step);
      step.result = result;
      step.status = 'done';

      // When a step is skipped, mark all its descendents as skipped as well.
      if (result === 'skipped') {
        forEachDescendant(step, (descendant) => {
          descendant.result = 'skipped';
          step.status = 'done';
        });
      }

      if (result === 'failed') {
        step.error = action.error;
      }

      break;
    }

    default:
      return steps;
  }
  return steps;
});
