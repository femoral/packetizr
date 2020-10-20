import { Packet } from "../../contract/model/Packet";
import { Field, FieldTypes } from "../../contract/model/Field";
import { SourceFile } from "../SourceFile";
import { TemplateContainer } from "./TemplateContainer";
import { pascalCase } from "change-case";
import { TypeSchema } from "../../contract/model/TypeSchema";
import { ModelClass } from "./model/ModelClass";

export class ModelGenerator {
  constructor(private _templateContainer: TemplateContainer) {}

  generate(model: Packet | TypeSchema): SourceFile {
    const isPacket = model instanceof Packet;
    return {
      name: `${pascalCase(model.name)}${isPacket ? "" : "Dto"}.cs`,
      content: this._templateContainer.build<ModelClass>("model", {
        isPacket,
        className: pascalCase(model.name),
        header: !(model instanceof TypeSchema) ? model.header : undefined,
        fields: model.fields.map((field) => ({
          type: this.getType(field),
          name: pascalCase(field.name),
        })),
      }),
    };
  }

  private getType(field: Field): string {
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
      default:
        return `${pascalCase(field.schema)}Dto`;
    }
  }
}
