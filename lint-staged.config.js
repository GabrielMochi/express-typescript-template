/* eslint-disable */
module.exports = {
  "**/*.ts": () => "tsc --noEmit",

  "**/*.(ts|js)": (filenames) => [
    `eslint --fix ${filenames.join(" ")}`,
    `prettier --max-warnings 0 --write ${filenames.join(" ")}`,
  ],

  "**/*.(md|json)": (filenames) => `prettier --write ${filenames.join(" ")}`,
};
