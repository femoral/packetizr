import { Packet } from "../../contract/model/Packet";
import { Field, FieldTypes } from "../../contract/model/Field";
import { SourceFile } from "../SourceFile";
import { TemplateContainer } from "./TemplateContainer";
import * as changeCase from "change-case";

export class ModelGenerator {
  constructor(private _templateContainer: TemplateContainer) {}

  generate(packet: Packet): SourceFile {
    return {
      name: `${changeCase.snakeCase(packet.name).replace("_", "-")}.go`,
      content: this._templateContainer.build("model", {
        className: packet.name,
        header: packet.header,
        fields: packet.fields.map((field) => ({
          type: this.getType(field),
          name: field.name,
        })),
      }),
    };
  }

  private getType(field: Field) {
    switch (field.type) {
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
    }
  }
}
