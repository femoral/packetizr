import { GenerateContractCodeUseCase } from "../../src/contract/GenerateContractCodeUseCase";
import { SourceCodeWriter } from "../../src/writer/SourceCodeWriter";
import { deepEqual, instance, mock, verify, when } from "ts-mockito";
import { ContractFixture } from "./model/Contract.fixture";
import { CodeGenerator } from "../../src/code-generation/CodeGenerator";
import { SourceFileFixture } from "../code-generation/SourceFile.fixture";

describe("execute is called with contract", () => {
  let sourceCodeWriterMock: SourceCodeWriter;
  let codeGeneratorMock: CodeGenerator;
  let getContractUseCase: GenerateContractCodeUseCase;

  beforeEach(() => {
    codeGeneratorMock = mock<CodeGenerator>();
    sourceCodeWriterMock = mock<SourceCodeWriter>();
    getContractUseCase = new GenerateContractCodeUseCase(
      instance(codeGeneratorMock),
      instance(sourceCodeWriterMock)
    );
  });

  it("Should call CodeGenerator with contract", async () => {
    await getContractUseCase.execute(ContractFixture.buildOk());

    verify(
      codeGeneratorMock.generate(deepEqual(ContractFixture.buildOk()))
    ).once();
  });

  describe("code generator returned source files", () => {
    it("Should call sourceCodeWriter with source files", async () => {
      when(
        codeGeneratorMock.generate(deepEqual(ContractFixture.buildOk()))
      ).thenReturn(SourceFileFixture.buildListOk());

      await getContractUseCase.execute(ContractFixture.buildOk());

      verify(
        sourceCodeWriterMock.write(deepEqual(SourceFileFixture.buildListOk()))
      ).once();
    });
  });
});
