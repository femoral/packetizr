import {Packet} from "../../contract/model/Packet";
import {SourceFile} from "../SourceFile";
import * as handlebars from "handlebars";
import * as fs from "fs";
import {SerializerClass} from "./model/SerializerClass";

export class SerializerGenerator {
  private _template = handlebars.compile<SerializerClass>(
    fs.readFileSync(`${__dirname}/template/csharp-serializer.hbs`).toString()
  );

  compile(packet: Packet): SourceFile {
    return {
      name: `${packet.name}PacketSerializer.cs`,
      content: this._template({
        modelType: packet.name,
        fields: packet.fields.map((field) => field.name),
      }),
    }
  }
}