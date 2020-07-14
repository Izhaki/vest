import { queue, run } from '../actions';

export default ({ dispatch, getState }) => {
  const startRunning = () => {
    const {
      stats: { running },
    } = getState();

    if (!running) {
      dispatch(run());
    }
  };

  return (next) => (action) => {
    const result = next(action);
    switch (action.type) {
      case 'step/updated': {
        const { autoRun } = getState().config;
        const { step } = action;
        if (autoRun) {
          dispatch(queue(step));
        }
        break;
      }

      case 'importDone': {
        const { autoRun } = getState().config;
        if (autoRun) {
          startRunning();
        }
        break;
      }

      case 'step/run': {
        dispatch(queue(action.step));
        startRunning();
        break;
      }

      default:
    }

    return result;
  };
};
