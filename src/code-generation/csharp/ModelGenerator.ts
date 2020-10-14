import { Packet } from "../../contract/model/Packet";
import * as fs from "fs";
import * as handlebars from "handlebars";
import { Field, FieldTypes } from "../../contract/model/Field";
import { ModelClass } from "./model/ModelClass";
import { SourceFile } from "../SourceFile";

export class ModelGenerator {
  private _template = handlebars.compile<ModelClass>(
    fs.readFileSync(`${__dirname}/template/csharp-model.hbs`).toString()
  );

  compile(packet: Packet): SourceFile {
    return {
      name: `${packet.name}.cs`,
      content: this._template({
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
