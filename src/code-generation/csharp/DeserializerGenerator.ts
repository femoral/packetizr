import { Packet } from "../../contract/model/Packet";
import { SourceFile } from "../SourceFile";
import { TemplateContainer } from "./TemplateContainer";
import { FieldTypes } from "../../contract/model/Field";
import { DeserializerClass } from "./model/DeserializerClass";
import { camelCase, pascalCase } from "change-case";
import { TypeSchema } from "../../contract/model/TypeSchema";

export class DeserializerGenerator {
  constructor(private _templateContainer: TemplateContainer) {}

  generate(model: Packet | TypeSchema): SourceFile {
    const isPacket = model instanceof Packet;
    const schemas = model.fields
      .filter((field) => field.type === FieldTypes.OBJECT)
      .map((field) => ({
        pascalCaseName: pascalCase(field.schema),
        camelCaseName: camelCase(field.schema),
      }));
    return {
      name: `${pascalCase(model.name)}${
        isPacket ? "" : "Dto"
      }PacketDeserializer.cs`,
      content: this._templateContainer.build<DeserializerClass>(
        "deserializer",
        {
          hasCustomTypes: schemas.length > 0,
          modelType: `${pascalCase(model.name)}${isPacket ? "" : "Dto"}`,
          schemas,
          fields: model.fields.map((field) => ({
            name: pascalCase(field.name),
            length: field.length,
            isChar: field.type == FieldTypes.CHAR,
            isVarchar: field.type == FieldTypes.VARCHAR,
            isNumeric:
              field.type != FieldTypes.CHAR &&
              field.type != FieldTypes.VARCHAR &&
              field.type != FieldTypes.UINT8 &&
              field.type != FieldTypes.INT8 &&
              field.type != FieldTypes.OBJECT,
            isSingleByte:
              field.type == FieldTypes.UINT8 || field.type == FieldTypes.INT8,
            isSigned:
              field.type == FieldTypes.INT32 ||
              field.type == FieldTypes.INT16 ||
              field.type == FieldTypes.INT8,
            isObject: field.type == FieldTypes.OBJECT,
            schema: camelCase(field.schema),
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
