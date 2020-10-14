import { SourceFile } from "../../../src/code-generation/SourceFile";
import * as fs from "fs";

export class CSharpSourceFileFixture {
  static buildListOk(): SourceFile[] {
    return [
      this.buildPacket1Model(),
      this.buildPacket2Model(),
      this.buildPacket1Serializer(),
      this.buildPacket2Serializer(),
      this.buildSerializerInterface(),
    ];
  }

  static buildPacket1Model(): SourceFile {
    return { name: "Packet1Model.cs", content: "Packet1Model content" };
  }

  static buildPacket2Model(): SourceFile {
    return { name: "Packet2Model.cs", content: "Packet2Model content" };
  }

  static buildPacket1Serializer(): SourceFile {
    return {
      name: "Packet1Serializer.cs",
      content: "Packet1Serializer content",
    };
  }

  static buildPacket2Serializer(): SourceFile {
    return {
      name: "Packet2Serializer.cs",
      content: "Packet2Serializer content",
    };
  }

  static buildBoilerplateFiles() {
    return [this.buildSerializerInterface(), this.buildDeserializerInterface()];
  }

  static buildSerializerInterface(): SourceFile {
    return {
      name: "IPacketSerializer.cs",
      content: fs
        .readFileSync(`${__dirname}/fixture/IPacketSerializer.cs`)
        .toString(),
    };
  }

  private static buildDeserializerInterface() {
    return {
      name: "IPacketDeserializer.cs",
      content: fs
        .readFileSync(`${__dirname}/fixture/IPacketDeserializer.cs`)
        .toString(),
    };
  }
}
