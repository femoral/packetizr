import { Packet } from "../../contract/model/Packet";
import { SourceFile } from "../SourceFile";
import { TemplateContainer } from "./TemplateContainer";
import { Field, FieldTypes } from "../../contract/model/Field";
import { DeserializerClass } from "./model/DeserializerClass";
import { camelCase, pascalCase, snakeCase } from "change-case";
import { TypeSchema } from "../../contract/model/TypeSchema";

export class DeserializerGenerator {
  constructor(private _templateContainer: TemplateContainer) {}

  generate(model: Packet | TypeSchema): SourceFile {
    const isPacket = model instanceof Packet;
    return {
      name: `${snakeCase(model.name).replace("_", "-")}${
        isPacket ? "" : "-dto"
      }.deserializer.go`,
      content: this._templateContainer.build<DeserializerClass>(
        "deserializer",
        {
          modelType: `${pascalCase(model.name)}${isPacket ? "" : "Dto"}`,
          importBinaryPackage:
            model.fields.filter((field) => field.type != FieldTypes.OBJECT)
              .length > 0,
          fields: model.fields.map((field) => this.getField(field)),
          schemas: model.fields
            .filter((field) => !field.isPrimitive)
            .map((field) => ({
              pascalCaseName: pascalCase(field.schema),
              camelCaseName: camelCase(field.schema),
            })),
        }
      ),
    };
  }

  private getField(field: Field) {
    return {
      camelCaseName: camelCase(field.name),
      pascalCaseName: pascalCase(field.name),
      isChar: field.type == FieldTypes.CHAR,
      isVarchar: field.type == FieldTypes.VARCHAR,
      isNumeric:
        field.type != FieldTypes.CHAR &&
        field.type != FieldTypes.VARCHAR &&
        field.type != FieldTypes.OBJECT &&
        field.type != FieldTypes.ARRAY,
      length: field.length,
      isObject: field.type === FieldTypes.OBJECT,
      isArray: field.type === FieldTypes.ARRAY,
      schema: {
        camelCaseName: camelCase(field.schema),
        pascalCaseName: pascalCase(field.schema),
      },
      items: {
        isPrimitive: field.isPrimitive,
        isChar: field.schema == FieldTypes.CHAR,
        isVarchar: field.schema == FieldTypes.VARCHAR,
        isNumeric:
          field.schema != FieldTypes.CHAR && field.schema != FieldTypes.VARCHAR,
        type: this.getDeclaredType(field.schema),
      },
    };
  }

  private getDeclaredType(type: string) {
    switch (type) {
      case FieldTypes.UINT32:
        return "uint32";
      case FieldTypes.UINT16:
        return "uint16";
      case FieldTypes.UINT8:
        return "uint8";
      case FieldTypes.INT32:
        return "int32";
      case FieldTypes.INT16:
        return "int16";
      case FieldTypes.INT8:
        return "int8";
      case FieldTypes.VARCHAR:
        return "string";
      case FieldTypes.CHAR:
        return "string";
      case FieldTypes.FLOAT32:
        return "float32";
      default:
        return `${pascalCase(type)}Dto`;
    }
  }
}
