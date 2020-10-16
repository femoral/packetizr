import { ModelGenerator } from "./ModelGenerator";
import { Contract } from "../../contract/model/Contract";
import { SourceFile } from "../SourceFile";
import { CodeGenerator } from "../CodeGenerator";
import { BoilerplateGenerator } from "./BoilerplateGenerator";
import { SerializerGenerator } from "./SerializerGenerator";
import { DeserializerGenerator } from "./DeserializerGenerator";

export class CSharpCodeGenerator implements CodeGenerator {
  constructor(
    private _boilerplateGenerator: BoilerplateGenerator,
    private _modelGenerator: ModelGenerator,
    private _serializerGenerator: SerializerGenerator,
    private _deserializerGenerator: DeserializerGenerator
  ) {}

  generate(contract: Contract): SourceFile[] {
    return [
      ...contract.packets.map((packet) => this._modelGenerator.compile(packet)),
      ...contract.packets.map((packet) =>
        this._serializerGenerator.compile(packet)
      ),
      ...contract.packets.map((packet) =>
        this._deserializerGenerator.compile(packet)
      ),
      ...this._boilerplateGenerator.compile(),
    ];
  }
}
