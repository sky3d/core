// eslint-disable-next-line @typescript-eslint/no-var-requires
const globalConfig = require('../../jest.config')

module.exports = {
  ...globalConfig,
  rootDir: '../../',
  testMatch: ["<rootDir>/packages/plugin-validator/src/**/*.spec.ts"]
}
  