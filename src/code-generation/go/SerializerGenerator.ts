import { Packet } from "../../contract/model/Packet";
import { SourceFile } from "../SourceFile";
import { TemplateContainer } from "./TemplateContainer";
import { SerializerClass } from "./model/SerializerClass";
import { Field, FieldTypes } from "../../contract/model/Field";
import { camelCase, pascalCase, snakeCase } from "change-case";
import { TypeSchema } from "../../contract/model/TypeSchema";

export class SerializerGenerator {
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
      name: `${snakeCase(model.name).replace("_", "-")}${
        isPacket ? "" : "-dto"
      }.serializer.go`,
      content: this._templateContainer.build<SerializerClass>("serializer", {
        importBinaryPackage:
          model.fields.filter((field) => field.type != FieldTypes.OBJECT)
            .length > 0 || isPacket,
        isPacket,
        model: {
          pascalCaseName: `${pascalCase(model.name)}${isPacket ? "" : "Dto"}`,
          camelCaseName: `${camelCase(model.name)}${isPacket ? "" : "Dto"}`,
        },
        fields: model.fields.map((field) => this.getField(field)),
        schemas,
      }),
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
      isObject: field.type === FieldTypes.OBJECT,
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
