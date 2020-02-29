// jest.config.js
module.exports = {
  // [...]
  // Replace `ts-jest` with the preset you want to use
  // from the above list
  preset: "ts-jest",
  testMatch: ["**/packages/**/*.test.[jt]s?(x)"],
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"]
};
