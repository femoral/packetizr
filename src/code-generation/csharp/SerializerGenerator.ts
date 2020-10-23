import { Packet } from "../../contract/model/Packet";
import { SourceFile } from "../SourceFile";
import { TemplateContainer } from "./TemplateContainer";
import { SerializerClass } from "./model/SerializerClass";
import { Field, FieldTypes } from "../../contract/model/Field";
import { camelCase, pascalCase } from "change-case";
import { TypeSchema } from "../../contract/model/TypeSchema";

export class SerializerGenerator {
  constructor(private _templateContainer: TemplateContainer) {}

  generate(model: Packet | TypeSchema): SourceFile {
    const schemas = model.fields
      .filter((field) => !field.isPrimitive)
      .map((field) => ({
        pascalCaseName: pascalCase(field.schema),
        camelCaseName: camelCase(field.schema),
      }));
    const isPacket = model instanceof Packet;
    return {
      name: `${pascalCase(model.name)}${
        isPacket ? "" : "Dto"
      }PacketSerializer.cs`,
      content: this._templateContainer.build<SerializerClass>("serializer", {
        isPacket,
        hasCustomTypes: schemas.length > 0,
        modelType: `${pascalCase(model.name)}${isPacket ? "" : "Dto"}`,
        schemas,
        model: {
          pascalCaseName: `${pascalCase(model.name)}${isPacket ? "" : "Dto"}`,
          camelCaseName: `${camelCase(model.name)}${isPacket ? "" : "Dto"}`,
        },
        fields: model.fields.map((field) => this.getField(field)),
      }),
    };
  }

  private getField(field: Field) {
    return {
      name: pascalCase(field.name),
      isChar: field.type == FieldTypes.CHAR,
      isVarchar: field.type == FieldTypes.VARCHAR,
      isNumeric:
        field.type != FieldTypes.CHAR &&
        field.type != FieldTypes.VARCHAR &&
        field.type != FieldTypes.OBJECT &&
        field.type != FieldTypes.ARRAY,
      isObject: field.type == FieldTypes.OBJECT,
      isArray: field.type === FieldTypes.ARRAY,
      schema: camelCase(field.schema),
      items: {
        isPrimitive: field.isPrimitive,
        isChar: field.schema == FieldTypes.CHAR,
        isVarchar: field.schema == FieldTypes.VARCHAR,
        isNumeric:
          field.schema != FieldTypes.CHAR && field.schema != FieldTypes.VARCHAR,
      },
    };
  }
}
