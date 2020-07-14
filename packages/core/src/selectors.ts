export const getStepByBreadcrumb = ({ steps }, breadcrumb) =>
  breadcrumb.reduce(
    (step, id) =>
      step ? step.children.find((child) => child.id === id) : undefined,
    { children: steps }
  );

const search = (node, id) => {
  if (node.id === id) {
    return node;
  }

  const { children = [] } = node;

  for (const child of children) {
    const match = search(child, id);

    if (match) {
      return match;
    }
  }
  return undefined;
};

export const getStepById = ({ steps }, id) => search({ children: steps }, id);
