export const isBrowser = typeof window !== 'undefined';

export const isEmpty = (arr) => arr === undefined || arr.length === 0;
export const isntEmpty = (arr) => !isEmpty(arr);

export const now = () => (isBrowser ? performance.now() : Date.now());

export const forEachDescendant = (step, callback) => {
  const { children = [] } = step;
  children.forEach((child) => {
    callback(child);
    forEachDescendant(child, callback);
  });
};

export const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
