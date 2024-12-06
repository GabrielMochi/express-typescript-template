import { expect } from "chai";
import { config } from "../../src/infra/config";
import testConfigJSON from "../../src/config/test.json";

describe("Config Infra", () => {
  it("Should load environment variables based on configuration file", () => {
    const configValues = config.get();
    expect(configValues).to.be.deep.equal(testConfigJSON);
  });
});
