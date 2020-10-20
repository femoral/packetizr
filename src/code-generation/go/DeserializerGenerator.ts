import { Packet } from "../../contract/model/Packet";
import { SourceFile } from "../SourceFile";
import { TemplateContainer } from "./TemplateContainer";
import { FieldTypes } from "../../contract/model/Field";
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
          fields: model.fields.map((field) => ({
            camelCaseName: camelCase(field.name),
            pascalCaseName: pascalCase(field.name),
            isChar: field.type == FieldTypes.CHAR,
            isVarchar: field.type == FieldTypes.VARCHAR,
            isNumeric:
              field.type != FieldTypes.CHAR &&
              field.type != FieldTypes.VARCHAR &&
              field.type != FieldTypes.OBJECT,
            length: field.length,
            isObject: field.type === FieldTypes.OBJECT,
            schema: camelCase(field.schema),
          })),
          schemas: model.fields
            .filter((field) => field.type === FieldTypes.OBJECT)
            .map((field) => ({
              pascalCaseName: pascalCase(field.schema),
              camelCaseName: camelCase(field.schema),
            })),
        }
      ),
    };
  }
}
