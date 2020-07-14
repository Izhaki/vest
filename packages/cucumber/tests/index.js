import { createSuite } from '@vest/webpack';

const stepDefinitions = require.context('.', true, /stepDefinitions\.js$/);
const features = require.context('!!../src/loader.js!.', true, /\.feature$/);

export default createSuite({
  modules: [stepDefinitions, features],
  bail: true,
});
