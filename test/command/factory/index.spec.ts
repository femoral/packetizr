import {
  buildGenerateContractCodeUseCase,
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
    let generateContractCodeUseCase = await buildGenerateContractCodeUseCase(
      "outputDir",
      "go"
    );

    expect(generateContractCodeUseCase).toBeInstanceOf(
      GenerateContractCodeUseCase
    );
  });
});
