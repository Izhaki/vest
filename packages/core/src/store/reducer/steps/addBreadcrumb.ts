const groupById = (steps) =>
  steps.reduce((ids, step) => {
    ids[step.id] = ids[step.id] || [];
    ids[step.id].push(step);
    return ids;
  }, {});

const renameMultipleSteps = (steps) => {
  if (steps.length > 1) {
    steps.forEach((step, index) => {
      step.id = `${step.id} ${index + 1}`;
    });
  }
};

const disambiguateIds = (steps) => {
  const ids = groupById(steps);
  Object.values(ids).forEach(renameMultipleSteps);
};

const issueMissingIds = (steps) => {
  steps.forEach((step) => {
    step.id = step.id || step.name || step.keyword;
    step.name = step.name || step.keyword; // TODO: we still need this?
  });
};

const addBreadcrumb = (step, breadcrumb = []) => {
  step.breadcrumb = [...breadcrumb, step.id];
  if (step.children) {
    issueMissingIds(step.children);
    disambiguateIds(step.children);
    step.children = step.children.map((child) =>
      addBreadcrumb(child, step.breadcrumb)
    );
  }
  return step;
};

export default addBreadcrumb;
