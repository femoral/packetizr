import { SourceFile } from "../SourceFile";
import { TemplateContainer } from "./TemplateContainer";

export class BoilerplateGenerator {
  constructor(private _templateContainer: TemplateContainer) {}

  compile(): SourceFile[] {
    return [
      {
        name: "IPacketSerializer.cs",
        content: this._templateContainer.build("serializer-interface"),
      },
      {
        name: "IPacketDeserializer.cs",
        content: this._templateContainer.build("deserializer-interface"),
      },
    ];
  }
}
