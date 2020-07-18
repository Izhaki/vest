import { isntEmpty } from '@vest/core/utils';

const isEachHook = (step) => ['beforeEach', 'afterEach'].includes(step.keyword);
const isKeyword = (keyword) => (step) => step.keyword === keyword;
const isType = (type) => (step) => step.type === type;

const hookSortOrder = {
  before: -1,
  after: 1,
};

const getStepSortOrder = (step) => hookSortOrder[step.keyword] || 0;

const stepCompare = (a, b) => getStepSortOrder(a) - getStepSortOrder(b);

const clone = (obj) => ({ ...obj });

const applyHooks = (step, accumulated = { beforeEach: [], afterEach: [] }) => {
  if (step.children) {
    // TODO: Too long refactor out.
    const beforeEach = [
      ...accumulated.beforeEach,
      ...step.children.filter(isKeyword('beforeEach')),
    ];
    const afterEach = [
      ...step.children.filter(isKeyword('afterEach')),
      ...accumulated.afterEach,
    ];

    // Remove all hooks
    const children = step.children.filter((child) => !isEachHook(child));

    children.sort(stepCompare); // Sort all hooks
    step.children = children.map((child) => {
      applyHooks(child, { beforeEach, afterEach });
      const needsExpanding =
        isType('test')(child) && isntEmpty([...beforeEach, ...afterEach]);
      const newChild = needsExpanding
        ? {
            ...child,
            // Uncomment to see block in ui
            type: 'block',
            children: [
              ...beforeEach.map(clone), // We clone to get a new hook reference object
              {
                ...child,
                id: 'test',
              },
              ...afterEach.map(clone), // We clone to get a new hook reference object
            ],
          }
        : child;
      return newChild;
    });
  }
  return step;
};

export default function transformModule(step) {
  return applyHooks(step);
}
