import * as generate from "../../src/command/Generate";
import { ContractFixture } from "../contract/model/Contract.fixture";

let getContractUseCaseMock = {
  execute: jest.fn(),
};
let generateContractCodeUseCaseMock = {
  execute: jest.fn(),
};

jest.mock("../../src/command/factory", () => {
  return {
    buildGenerateContractCodeUseCase: () => generateContractCodeUseCaseMock,
    buildGetContractUseCase: () => getContractUseCaseMock,
  };
});

beforeEach(() => {
  jest.resetAllMocks();
});

describe("execute is called with GenerateArgs", () => {
  it("Should get contract", async () => {
    await generate.execute({ file: "file", out: "out", language: "csharp" });

    expect(getContractUseCaseMock.execute).toHaveBeenCalledTimes(1);
  });

  describe("GetContractUseCase resolved contract", () => {
    beforeEach(() => {
      getContractUseCaseMock.execute.mockReturnValueOnce(
        Promise.resolve(ContractFixture.buildPlainContract())
      );
    });

    it("Should generate code with contract", async () => {
      await generate.execute({ file: "file", out: "out", language: "csharp" });

      expect(generateContractCodeUseCaseMock.execute).toHaveBeenCalledWith(
        ContractFixture.buildPlainContract()
      );
    });
  });
});
