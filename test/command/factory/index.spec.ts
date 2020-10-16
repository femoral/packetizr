import {
  buildGenerateContractCodeUseCaseFactory,
  buildGetContractUseCase,
} from "../../../src/command/factory";
import { GetContractUseCase } from "../../../src/contract/GetContractUseCase";
import { GenerateContractCodeUseCase } from "../../../src/contract/GenerateContractCodeUseCase";

describe("buildGetContractUseCase is called with file path", () => {
  it("should return new GetContractUseCase instance", () => {
    let getContractUseCase = buildGetContractUseCase("file");

    expect(getContractUseCase).toBeInstanceOf(GetContractUseCase);
  });
});

describe("buildGetContractUseCase is called with file path", () => {
  it("should return new GetContractUseCase instance", async () => {
    let generateContractCodeUseCase = await buildGenerateContractCodeUseCaseFactory(
      "outputDir",
      "go"
    );

    expect(generateContractCodeUseCase).toBeInstanceOf(
      GenerateContractCodeUseCase
    );
  });
});