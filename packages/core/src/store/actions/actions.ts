export const setConfig = (config) => ({
  type: 'config/set',
  config,
});

export const queueAll = () => ({
  type: 'step/queueAll',
});

export const queue = (step) => ({
  type: 'step/queue',
  step,
});

export const runStep = (step) => ({
  type: 'step/run',
  step,
});

export const running = (step) => ({
  type: 'step/running',
  step,
});

export const passed = (step) => ({
  type: 'step/passed',
  result: 'passed',
  step,
});
export const skipped = (step) => ({
  type: 'step/skipped',
  result: 'skipped',
  step,
});
export const failed = (
  step,
  error = undefined // Only leafs include errors, not blocks
) => ({
  type: 'step/failed',
  result: 'failed',
  step,
  error,
});

export const stepUpdated = (step) => ({
  type: 'step/updated',
  step,
});
export const sortSteps = () => ({
  type: 'steps/sort',
});

export const importDone = (updatedModules) => ({
  type: 'importDone',
  updatedModules,
});

export const runStart = () => ({ type: 'run/start' });
export const runEnd = () => ({ type: 'run/end' });
