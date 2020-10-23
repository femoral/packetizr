import { Packet } from "../../contract/model/Packet";
import { SourceFile } from "../SourceFile";
import { TemplateContainer } from "./TemplateContainer";
import { Field, FieldTypes } from "../../contract/model/Field";
import { DeserializerClass } from "./model/DeserializerClass";
import { camelCase, pascalCase } from "change-case";
import { TypeSchema } from "../../contract/model/TypeSchema";

export class DeserializerGenerator {
  constructor(private _templateContainer: TemplateContainer) {}

  generate(model: Packet | TypeSchema): SourceFile {
    const isPacket = model instanceof Packet;
    const schemas = model.fields
      .filter((field) => !field.isPrimitive)
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
          fields: model.fields.map((field) => this.getField(field)),
        }
      ),
    };
  }

  private getField(field: Field) {
    return {
      name: {
        pascalCaseName: pascalCase(field.name),
        camelCaseName: camelCase(field.name),
      },
      schema: camelCase(field.schema),
      length: field.length,
      isChar: field.type == FieldTypes.CHAR,
      isVarchar: field.type == FieldTypes.VARCHAR,
      isNumeric:
        field.type != FieldTypes.CHAR &&
        field.type != FieldTypes.VARCHAR &&
        field.type != FieldTypes.UINT8 &&
        field.type != FieldTypes.INT8 &&
        field.type != FieldTypes.OBJECT &&
        field.type != FieldTypes.ARRAY,
      isSingleByte:
        field.type == FieldTypes.UINT8 || field.type == FieldTypes.INT8,
      isSigned:
        field.type == FieldTypes.INT32 ||
        field.type == FieldTypes.INT16 ||
        field.type == FieldTypes.INT8,
      isObject: field.type == FieldTypes.OBJECT,
      isArray: field.type === FieldTypes.ARRAY,
      bitConverterMethod: this.getBitConverterMethod(field.schema),
      items: {
        type: this.getTypeDefinition(field.schema),
        isPrimitive: field.isPrimitive,
        isChar: field.schema === FieldTypes.CHAR,
        isVarchar: field.schema === FieldTypes.VARCHAR,
        isSingleByte:
          field.schema == FieldTypes.UINT8 || field.schema == FieldTypes.INT8,
        isSigned:
          field.schema == FieldTypes.INT32 ||
          field.schema == FieldTypes.INT16 ||
          field.schema == FieldTypes.INT8,
        isNumeric:
          field.schema != FieldTypes.CHAR &&
          field.schema != FieldTypes.VARCHAR &&
          field.schema != FieldTypes.UINT8 &&
          field.schema != FieldTypes.INT8,
      },
    };
  }

  private getBitConverterMethod(type: string) {
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

  private getTypeDefinition(schema: string): string {
    switch (schema) {
      case FieldTypes.UINT32:
        return "uint";
      case FieldTypes.UINT16:
        return "ushort";
      case FieldTypes.UINT8:
        return "byte";
      case FieldTypes.INT32:
        return "int";
      case FieldTypes.INT16:
        return "short";
      case FieldTypes.INT8:
        return "sbyte";
      case FieldTypes.VARCHAR:
        return "string";
      case FieldTypes.CHAR:
        return "string";
      case FieldTypes.FLOAT32:
        return "float";
      default:
        return `${pascalCase(schema)}Dto`;
    }
  }
}
