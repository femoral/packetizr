import { ModelGenerator } from "./ModelGenerator";
import { Contract } from "../../contract/model/Contract";
import { SourceFile } from "../SourceFile";
import { CodeGenerator } from "../CodeGenerator";

export class CSharpCodeGenerator implements CodeGenerator {
  constructor(private _modelGenerator: ModelGenerator) {}

  compile(contract: Contract): SourceFile[] {
    return contract.packets.map((packet) =>
      this._modelGenerator.compile(packet)
    );
  }
}