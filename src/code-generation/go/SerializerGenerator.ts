import { Packet } from "../../contract/model/Packet";
import { SourceFile } from "../SourceFile";
import { TemplateContainer } from "./TemplateContainer";
import { SerializerClass } from "./model/SerializerClass";
import { FieldTypes } from "../../contract/model/Field";
import { camelCase, pascalCase, snakeCase } from "change-case";
import { TypeSchema } from "../../contract/model/TypeSchema";

export class SerializerGenerator {
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
        fields: model.fields.map((field) => ({
          camelCaseName: camelCase(field.name),
          pascalCaseName: pascalCase(field.name),
          isChar: field.type == FieldTypes.CHAR,
          isVarchar: field.type == FieldTypes.VARCHAR,
          isNumeric:
            field.type != FieldTypes.CHAR &&
            field.type != FieldTypes.VARCHAR &&
            field.type != FieldTypes.OBJECT,
          isObject: field.type === FieldTypes.OBJECT,
          schema: camelCase(field.schema),
        })),
        schemas,
      }),
    };
  }
}
