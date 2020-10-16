import { ModelGenerator } from "./ModelGenerator";
import { Contract } from "../../contract/model/Contract";
import { SourceFile } from "../SourceFile";

export class GoCodeGenerator {
  constructor(private _modelGenerator: ModelGenerator) {}

  generate(contract: Contract): SourceFile[] {
    return [
      ...contract.packets.map((packet) =>
        this._modelGenerator.generate(packet)
      ),
    ];
  }
}