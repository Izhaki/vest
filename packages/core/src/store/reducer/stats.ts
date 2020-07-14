import produce from 'immer';
import { now, forEachDescendant } from '@vest/core/utils';

const emptyCounters = {
  dirty: 0,
  failed: 0,
  passed: 0,
  skipped: 0,
};

const initialState = {
  running: false,
  current: null,
  startTime: null,
  endTime: null,
  counters: {
    modules: { ...emptyCounters },
    specs: { ...emptyCounters },
  },
};

const updateCounters = (stats, result) => (step) => {
  if (step.counter) {
    const counters = stats.counters[step.counter];
    counters[result] += 1;
    counters.dirty -= 1;
  }
};

export default produce((stats = initialState, action) => {
  switch (action.type) {
    case 'importDone': {
      break;
    }

    case 'run/start': {
      stats.running = true;
      stats.startTime = now();
      stats.endTime = null;
      stats.counters.modules = { ...emptyCounters };
      stats.counters.specs = { ...emptyCounters };
      break;
    }

    case 'run/end': {
      stats.running = false;
      stats.endTime = now();
      break;
    }

    case 'step/running': {
      const { step } = action;
      stats.current = step.name;
      break;
    }

    case 'step/skipped': {
      const { step, result } = action;
      forEachDescendant(step, updateCounters(stats, result));
      // No break here - more handling below
    }
    // eslint-disable-next-line no-fallthrough
    case 'step/passed':
    case 'step/failed': {
      const { step, result } = action;
      stats.current = null;
      updateCounters(stats, result)(step);
      break;
    }

    default:
      return stats;
  }
  return stats;
});
