module.exports = (source) =>
  [
    `import { addFeature } from '@vest/cucumber';`,
    `addFeature(${JSON.stringify(source)})`,
  ].join('\n');
