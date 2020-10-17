import { Packet } from "../../contract/model/Packet";
import { SourceFile } from "../SourceFile";
import { TemplateContainer } from "./TemplateContainer";
import { FieldTypes } from "../../contract/model/Field";
import { DeserializerClass } from "./model/DeserializerClass";
import { camelCase, pascalCase, snakeCase } from "change-case";

export class DeserializerGenerator {
  constructor(private _templateContainer: TemplateContainer) {}

  generate(packet: Packet): SourceFile {
    return {
      name: `${snakeCase(packet.name).replace("_", "-")}.deserializer.go`,
      content: this._templateContainer.build<DeserializerClass>(
        "deserializer",
        {
          modelType: pascalCase(packet.name),
          fields: packet.fields.map((field) => ({
            endianness: "LittleEndian",
            camelCaseName: camelCase(field.name),
            pascalCaseName: pascalCase(field.name),
            isChar: field.type == FieldTypes.CHAR,
            isVarchar: field.type == FieldTypes.VARCHAR,
            isNumeric:
              field.type != FieldTypes.CHAR && field.type != FieldTypes.VARCHAR,
            length: field.length,
          })),
        }
      ),
    };
  }
}