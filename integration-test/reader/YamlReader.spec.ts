import { YamlContractReader } from "../../src/reader/YamlContractReader";
import { ContractFixture } from "../../test/contract/model/Contract.fixture";

it("Should resolve an object containing yml object when read is called", async () => {
  let yamlReader = new YamlContractReader("./integration-test/reader/test.yml");

  let object = await yamlReader.read();

  expect(object).toEqual(ContractFixture.buildOk());
});