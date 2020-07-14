const { keys, assign } = Object;

const globalsReducer = (globals, key) => {
  globals[key] = window[key];
  return globals;
};

export default function addGlobals(globals) {
  const oldGlobals = keys(globals).reduce(globalsReducer, {});
  assign(window, globals);
  return () => {
    assign(window, oldGlobals);
  };
}
