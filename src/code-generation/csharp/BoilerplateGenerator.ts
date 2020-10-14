import { SourceFile } from "../SourceFile";
import * as handlebars from "handlebars";
import * as fs from "fs";

export class BoilerplateGenerator {
  private _template = handlebars.compile<void>(
    fs
      .readFileSync(`${__dirname}/template/csharp-serializer-interface.hbs`)
      .toString()
  );

  compile(): SourceFile[] {
    return [{ name: "IPacketSerializer.cs", content: this._template() }];
  }
}
