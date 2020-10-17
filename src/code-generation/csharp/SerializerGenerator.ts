import { Packet } from "../../contract/model/Packet";
import { SourceFile } from "../SourceFile";
import { TemplateContainer } from "./TemplateContainer";
import { SerializerClass } from "./model/SerializerClass";
import { FieldTypes } from "../../contract/model/Field";
import { pascalCase } from "change-case";

export class SerializerGenerator {
  constructor(private _templateContainer: TemplateContainer) {}

  generate(packet: Packet): SourceFile {
    return {
      name: `${pascalCase(packet.name)}PacketSerializer.cs`,
      content: this._templateContainer.build<SerializerClass>("serializer", {
        modelType: pascalCase(packet.name),
        fields: packet.fields.map((field) => ({
          name: pascalCase(field.name),
          isChar: field.type == FieldTypes.CHAR,
          isVarchar: field.type == FieldTypes.VARCHAR,
          isNumeric:
            field.type != FieldTypes.CHAR && field.type != FieldTypes.VARCHAR,
        })),
      }),
    };
  }
}
