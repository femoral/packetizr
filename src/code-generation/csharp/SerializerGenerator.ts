import { Packet } from "../../contract/model/Packet";
import { SourceFile } from "../SourceFile";
import { TemplateContainer } from "./TemplateContainer";
import { SerializerClass } from "./model/SerializerClass";
import { FieldTypes } from "../../contract/model/Field";

export class SerializerGenerator {
  constructor(private _templateContainer: TemplateContainer) {}

  compile(packet: Packet): SourceFile {
    return {
      name: `${packet.name}PacketDeserializer.cs`,
      content: this._templateContainer.build<SerializerClass>("serializer", {
        modelType: packet.name,
        fields: packet.fields.map((field) => ({
          name: field.name,
          isChar: field.type == FieldTypes.CHAR,
          isVarchar: field.type == FieldTypes.VARCHAR,
          isNumeric:
            field.type != FieldTypes.CHAR && field.type != FieldTypes.VARCHAR,
        })),
      }),
    };
  }
}
