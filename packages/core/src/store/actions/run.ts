/* eslint-disable no-await-in-loop */
import { running, skipped, failed, passed, runStart, runEnd } from './actions';

const isQueued = (step) => step.status === 'queued';

const forAnimationFrame = () =>
  new Promise((resolve) => {
    if (typeof window !== 'undefined') {
      requestAnimationFrame(resolve);
    } else {
      resolve();
    }
  });

export default () => async (dispatch, getState) => {
  let bail = false;
  let err = null;

  const getFramework = (step) => getState().frameworks[step.framework];
  const isContextRoot = (step) => {
    const framework = getFramework(step);
    return (
      framework && framework.isContextRoot && framework.isContextRoot(step)
    );
  };
  const shouldSkipOnFailure = (step) =>
    getFramework(step).shouldSkipOnFailure(step);

  const getNextStep = () => getState().steps.find(isQueued);

  const runLeaf = async (step, context) => {
    dispatch(running(step));
    const framework = getFramework(step);
    try {
      await framework.runStep(step, { getState, context });
      dispatch(passed(step));
      return 'passed';
    } catch (error) {
      const { config } = getState();
      bail = config.rethrow || config.bail;
      // We only throw the first error. Within the same module, a step may throw and this
      // will lead to the succeeding step to throw. We really want to focus on the first one.
      if (config.rethrow && err === null) {
        err = error;
      }
      dispatch(failed(step, error));
      return 'failed';
    }
  };

  let runStep;

  const runBlock = async (block, context) => {
    if (isQueued(block)) {
      const steps = block.children.filter(isQueued);
      dispatch(running(block));

      let skip = false;
      let blockPassed = true;

      for (const step of steps) {
        if (skip || bail) {
          dispatch(skipped(step));
        } else {
          if (isContextRoot(step)) {
            context = {};
          }
          const stepResult = await runStep(step, context);

          skip = stepResult === 'failed' && shouldSkipOnFailure(step);
          blockPassed = blockPassed && stepResult === 'passed';
        }
      }

      if (blockPassed) {
        dispatch(passed(block));
      } else {
        dispatch(failed(block));
      }
      return blockPassed ? 'passed' : 'failed';
    }
    return undefined;
  };

  runStep = (step, context) =>
    step.children ? runBlock(step, context) : runLeaf(step, context);

  dispatch(runStart());
  try {
    await forAnimationFrame(); // This lets the ui update before we start running
    let step = getNextStep();
    while (step) {
      if (bail) {
        dispatch(skipped(step));
      } else {
        const context = {};
        await runStep(step, context);
      }
      step = getNextStep();
    }
  } finally {
    dispatch(runEnd());
    bail = false;
  }

  if (err) {
    const error = err;
    err = null;
    throw error;
  }
};
