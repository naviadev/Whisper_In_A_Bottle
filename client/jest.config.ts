import nextJest from "next/jest";
const createJestConfig = nextJest({
  dir: __dirname,
});
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/client/tsconfig.json",
    },
  },
  testRegex: ".*\\.spec\\.(ts|tsx)$",
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/client' }),
};
module.exports = createJestConfig(customJestConfig);
