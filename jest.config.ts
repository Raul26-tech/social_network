export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/*.test.ts"],
  collectCoverageFrom: ["<rootDir>/src/modules/**/services/*.ts"],
  // moduleNameMapper: {},
};
