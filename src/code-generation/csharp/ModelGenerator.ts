import { Packet } from "../../contract/model/Packet";
import { Field, FieldTypes } from "../../contract/model/Field";
import { SourceFile } from "../SourceFile";
import { TemplateContainer } from "./TemplateContainer";

export class ModelGenerator {
  constructor(private _templateContainer: TemplateContainer) {}

  compile(packet: Packet): SourceFile {
    return {
      name: `${packet.name}.cs`,
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
    }
  }
}
