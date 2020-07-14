import { isBrowser } from '@vest/core/utils';

declare global {
  interface Window {
    onRetestAction(action): void;
  }
}

export default () => (next) => (action) => {
  if (isBrowser && window.onRetestAction) {
    window.onRetestAction(action);
  }

  return next(action);
};
