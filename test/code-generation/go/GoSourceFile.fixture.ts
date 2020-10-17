import { SourceFile } from "../../../src/code-generation/SourceFile";
import * as fs from "fs";

export class GoSourceFileFixture {
  static buildListOk(): SourceFile[] {
    return [
      this.buildPacket1Model(),
      this.buildPacket2Model(),
      this.buildPacket1Serializer(),
      this.buildPacket2Serializer(),
      this.buildPacket1Deserializer(),
      this.buildPacket2Deserializer(),
    ];
  }

  static buildPacket1Model(): SourceFile {
    return { name: "Packet1Model.go", content: "Packet1Model content" };
  }

  static buildPacket2Model(): SourceFile {
    return { name: "Packet2Model.go", content: "Packet2Model content" };
  }

  static buildPacket1Serializer(): SourceFile {
    return {
      name: "Packet1Serializer.go",
      content: "Packet1Serializer content",
    };
  }

  static buildPacket2Serializer(): SourceFile {
    return {
      name: "Packet2Serializer.go",
      content: "Packet2Serializer content",
    };
  }

  static buildPacket1Deserializer(): SourceFile {
    return {
      name: "Packet1Serializer.go",
      content: "Packet1Serializer content",
    };
  }

  static buildPacket2Deserializer(): SourceFile {
    return {
      name: "Packet2Serializer.go",
      content: "Packet2Serializer content",
    };
  }

  static buildBoilerplateFiles() {
    return [this.buildSerializerInterface(), this.buildDeserializerInterface()];
  }

  static buildSerializerInterface(): SourceFile {
    return {
      name: "IPacketSerializer.go",
      content: fs
        .readFileSync(`${__dirname}/fixture/IPacketSerializer.go`)
        .toString(),
    };
  }

  private static buildDeserializerInterface() {
    return {
      name: "IPacketDeserializer.go",
      content: fs
        .readFileSync(`${__dirname}/fixture/IPacketDeserializer.go`)
        .toString(),
    };
  }
}
