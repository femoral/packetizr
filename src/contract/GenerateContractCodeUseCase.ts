import { SourceCodeWriter } from "../writer/SourceCodeWriter";
import { Contract } from "./model/Contract";
import { CodeGenerator } from "../code-generation/CodeGenerator";

export class GenerateContractCodeUseCase {
  constructor(
    private _codeGenerator: CodeGenerator,
    private _sourceCodeWriter: SourceCodeWriter
  ) {}

  async execute(contract: Contract) {
    let sourceFiles = this._codeGenerator.generate(contract);
    this._sourceCodeWriter.write(sourceFiles);
  }
}