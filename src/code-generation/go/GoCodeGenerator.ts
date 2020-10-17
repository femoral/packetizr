import { ModelGenerator } from "./ModelGenerator";
import { Contract } from "../../contract/model/Contract";
import { SourceFile } from "../SourceFile";
import { SerializerGenerator } from "./SerializerGenerator";

export class GoCodeGenerator {
  constructor(
    private _modelGenerator: ModelGenerator,
    private _serializerGenerator: SerializerGenerator
  ) {}

  generate(contract: Contract): SourceFile[] {
    return [
      ...contract.packets.map((packet) =>
        this._modelGenerator.generate(packet)
      ),
      ...contract.packets.map((packet) =>
        this._serializerGenerator.generate(packet)
      ),
    ];
  }
}
