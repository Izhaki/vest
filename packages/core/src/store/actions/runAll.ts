import { queueAll } from './actions';
import run from './run';

export default () => async (dispatch) => {
  dispatch(queueAll());
  return dispatch(run());
};
