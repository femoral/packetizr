import { YamlContractReader } from "../../src/reader/YamlContractReader";
import { ContractFixture } from "../../test/contract/model/Contract.fixture";

describe("read is called", () => {
  it("Should resolve a contract containing packets", async () => {
    let yamlReader = new YamlContractReader(
      "./integration-test/reader/fixture/plain-contract.yml"
    );

    let object = await yamlReader.read();

    expect(object).toEqual(ContractFixture.buildPlainContract());
  });

  describe("schema is defined", () => {
    it("Should resolve a contract with defined schemas", async () => {
      let yamlReader = new YamlContractReader(
        "./integration-test/reader/fixture/contract-with-schema.yml"
      );

      let object = await yamlReader.read();

      expect(object).toEqual(ContractFixture.buildContractWithSchema());
    });

    it("Should resolve contract with custom types, given types are defined in schemas", async () => {
      let yamlReader = new YamlContractReader(
        "./integration-test/reader/fixture/contract-with-schema-and-custom-types.yml"
      );

      let object = await yamlReader.read();

      expect(object).toEqual(
        ContractFixture.buildContractWithSchemaAndCustomTypes()
      );
    });

    it("Should reject, given custom type does not match any defined schema", (done) => {
      let yamlReader = new YamlContractReader(
        "./integration-test/reader/fixture/contract-with-missing-schema.yml"
      );

      yamlReader
        .read()
        .then(() => fail("should reject"))
        .catch(() => done());
    });

    describe("defined custom object has child custom types", () => {
      it("Should load contract with nested custom types", async () => {
        let yamlReader = new YamlContractReader(
          "./integration-test/reader/fixture/contract-with-nested-custom-types.yml"
        );

        let object = await yamlReader.read();

        expect(object).toEqual(
          ContractFixture.buildContractWithNestedCustomTypes()
        );
      });

      it("Should reject, given custom type has a reference to itself", (done) => {
        let yamlReader = new YamlContractReader(
          "./integration-test/reader/fixture/contract-with-nested-circular-reference.yml"
        );

        yamlReader
          .read()
          .then(() => fail("should reject"))
          .catch(() => done());
      });
    });

    describe("array field is defined", () => {
      it("should resolve contract with array field", async () => {
        let yamlReader = new YamlContractReader(
          "./integration-test/reader/fixture/contract-with-array.yml"
        );

        let object = await yamlReader.read();

        expect(object).toEqual(ContractFixture.buildContractWithArrayField());
      });

      it("should reject, given array schema is not defined", (done) => {
        let yamlReader = new YamlContractReader(
          "./integration-test/reader/fixture/contract-with-array-with-missing-schema.yml"
        );

        yamlReader
          .read()
          .then(() => fail("should reject"))
          .catch(() => done());
      });
    });
  });
});
