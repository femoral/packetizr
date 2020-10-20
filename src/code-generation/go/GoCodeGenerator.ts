import { ModelGenerator } from "./ModelGenerator";
import { Contract } from "../../contract/model/Contract";
import { SourceFile } from "../SourceFile";
import { SerializerGenerator } from "./SerializerGenerator";
import { DeserializerGenerator } from "./DeserializerGenerator";

export class GoCodeGenerator {
  constructor(
    private _modelGenerator: ModelGenerator,
    private _serializerGenerator: SerializerGenerator,
    private _deserializerGenerator: DeserializerGenerator
  ) {}

  generate(contract: Contract): SourceFile[] {
    return [
      ...contract.packets.map((packet) =>
        this._modelGenerator.generate(packet)
      ),
      ...contract.packets.map((packet) =>
        this._serializerGenerator.generate(packet)
      ),
      ...contract.packets.map((packet) =>
        this._deserializerGenerator.generate(packet)
      ),
      ...contract.typeSchemas.map((schema) =>
        this._modelGenerator.generate(schema)
      ),
      ...contract.typeSchemas.map((schema) =>
        this._serializerGenerator.generate(schema)
      ),
      ...contract.typeSchemas.map((schema) =>
        this._deserializerGenerator.generate(schema)
      ),
    ];
  }
}
