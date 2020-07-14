const path = require('path');
const { resolveTsAliases } = require('resolve-ts-aliases');
const withTM = require('next-transpile-modules')(['packages']);

const alias = resolveTsAliases(path.resolve('../tsconfig.json'));

/* eslint-disable no-param-reassign */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...alias,
    };

    return config;
  },
};

module.exports = withTM(nextConfig);
