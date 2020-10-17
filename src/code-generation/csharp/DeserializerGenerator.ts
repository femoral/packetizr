import { Packet } from "../../contract/model/Packet";
import { SourceFile } from "../SourceFile";
import { TemplateContainer } from "./TemplateContainer";
import { FieldTypes } from "../../contract/model/Field";
import { DeserializerClass } from "./model/DeserializerClass";
import { pascalCase } from "change-case";

export class DeserializerGenerator {
  constructor(private _templateContainer: TemplateContainer) {}

  generate(packet: Packet): SourceFile {
    return {
      name: `${pascalCase(packet.name)}PacketDeserializer.cs`,
      content: this._templateContainer.build<DeserializerClass>(
        "deserializer",
        {
          modelType: pascalCase(packet.name),
          fields: packet.fields.map((field) => ({
            name: pascalCase(field.name),
            length: field.length,
            isChar: field.type == FieldTypes.CHAR,
            isVarchar: field.type == FieldTypes.VARCHAR,
            isNumeric:
              field.type != FieldTypes.CHAR &&
              field.type != FieldTypes.VARCHAR &&
              field.type != FieldTypes.UINT8 &&
              field.type != FieldTypes.INT8,
            isSingleByte:
              field.type == FieldTypes.UINT8 || field.type == FieldTypes.INT8,
            isSigned:
              field.type == FieldTypes.INT32 ||
              field.type == FieldTypes.INT16 ||
              field.type == FieldTypes.INT8,
            bitConverterMethod: this.getBitConverterMethod(field.type),
          })),
        }
      ),
    };
  }

  private getBitConverterMethod(type: FieldTypes) {
    switch (type) {
      case FieldTypes.FLOAT32:
        return "ToSingle";
      case FieldTypes.INT32:
        return "ToInt32";
      case FieldTypes.INT16:
        return "ToInt16";
      case FieldTypes.UINT32:
        return "ToUInt32";
      case FieldTypes.UINT16:
        return "ToUInt16";
      default:
        return "";
    }
  }
}
