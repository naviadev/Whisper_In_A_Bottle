const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  "testRegex": ".*\\.spec\\.(ts|tsx)$"
};
module.exports = createJestConfig(customJestConfig);