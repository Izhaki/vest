import { createSuite } from '@vest/webpack';

const stepDefinitions = require.context('.', true, /stepDefinitions\.ts$/);
const features = require.context(
  '!!../../cucumber/src/loader.js!.',
  true,
  /\.feature$/
);

export default createSuite({
  modules: [stepDefinitions, features],
  rethrow: true,
});
