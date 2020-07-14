import produce from 'immer';
import { stepUpdated, sortSteps } from '@vest/core/store/actions';

const getTransformer = (framework) => framework.transformModule;

export default (store) => (next) => (action) => {
  const result = next(action);

  const frameworks = Object.values(store.getState().frameworks);
  frameworks.forEach((framework) => {
    if (framework.onAction) {
      framework.onAction(store)(action);
    }
  });

  if (action.type === 'importDone') {
    const { updatedModules } = action;
    const transformers = frameworks.map(getTransformer);
    Object.values(updatedModules).forEach((module) => {
      if (module.children.length) {
        const step = produce(module, (draft) =>
          transformers.reduce(
            (mod, transformModule) => transformModule(mod, store),
            draft
          )
        );
        store.dispatch(stepUpdated(step));
      }
    });
    store.dispatch(sortSteps());
  }

  return result;
};
