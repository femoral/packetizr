import {
  buildGenerateContractCodeUseCase,
  buildGetContractUseCase,
} from "../../../src/command/factory";
import { GetContractUseCase } from "../../../src/contract/GetContractUseCase";
import { GenerateContractCodeUseCase } from "../../../src/contract/GenerateContractCodeUseCase";

jest.mock(
  "packetizr-gen-test",
  () => ({
    generator: jest.fn(),
  }),
  { virtual: true }
);

describe("buildGetContractUseCase is called with file path", () => {
  it("should return new GetContractUseCase instance", () => {
    let getContractUseCase = buildGetContractUseCase("file");

    expect(getContractUseCase).toBeInstanceOf(GetContractUseCase);
  });
});

describe("buildGenerateContractCodeUseCase is called with outputDir, language and generator arguments", () => {
  it("should return new GetContractUseCase instance", async () => {
    let generateContractCodeUseCase = await buildGenerateContractCodeUseCase(
      "outputDir",
      "test",
      {}
    );

    expect(generateContractCodeUseCase).toBeInstanceOf(
      GenerateContractCodeUseCase
    );
  });

  it("should call generator factory with generator arguments", async () => {
    let generateContractCodeUseCase = await buildGenerateContractCodeUseCase(
      "outputDir",
      "test",
      {
        namespace: "some.namespace",
      }
    );

    expect(jest.requireMock("packetizr-gen-test").generator).toBeCalledWith({
      namespace: "some.namespace",
    });
  });
});
