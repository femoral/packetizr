import { Packet } from "../../contract/model/Packet";
import { Field, FieldTypes } from "../../contract/model/Field";
import { SourceFile } from "../SourceFile";
import { TemplateContainer } from "./TemplateContainer";
import * as changeCase from "change-case";
import { pascalCase } from "change-case";
import { TypeSchema } from "../../contract/model/TypeSchema";
import { ModelClass } from "./model/ModelClass";

export class ModelGenerator {
  constructor(private _templateContainer: TemplateContainer) {}

  generate(model: Packet | TypeSchema): SourceFile {
    const isPacket = model instanceof Packet;
    return {
      name: `${changeCase.snakeCase(model.name).replace("_", "-")}${
        isPacket ? "" : "-dto"
      }.go`,
      content: this._templateContainer.build<ModelClass>("model", {
        isPacket,
        className: pascalCase(model.name),
        header: !(model instanceof TypeSchema) ? model.header : undefined,
        fields: model.fields.map((field) => ({
          type: this.getType(field),
          name: pascalCase(field.name),
          isPointer:
            field.type === FieldTypes.OBJECT || field.type === FieldTypes.ARRAY,
          isArray: field.type === FieldTypes.ARRAY,
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
      default:
        return `${pascalCase(field.schema)}Dto`;
    }
  }
}
