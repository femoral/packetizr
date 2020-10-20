import { SourceFile } from "../../../src/code-generation/SourceFile";
import * as fs from "fs";

export class CSharpSourceFileFixture {
  static buildListOk(): SourceFile[] {
    return [
      this.buildPacket1Model(),
      this.buildPacket2Model(),
      this.buildPacket1Serializer(),
      this.buildPacket2Serializer(),
      this.buildPacket1Deserializer(),
      this.buildPacket2Deserializer(),
      this.buildSerializerInterface(),
    ];
  }

  static buildListWithCustomTypes(): SourceFile[] {
    return [
      this.buildPacket1Model(),
      this.buildPacket2Model(),
      this.buildPacket1Serializer(),
      this.buildPacket2Serializer(),
      this.buildPacket1Deserializer(),
      this.buildPacket2Deserializer(),
      this.buildSerializerInterface(),
      this.buildNumbersCustomTypeModel(),
      this.buildStringsCustomTypeModel(),
      this.buildNumbersCustomTypeSerializer(),
      this.buildStringsCustomTypeSerializer(),
      this.buildNumbersCustomTypeDeserializer(),
      this.buildStringsCustomTypeDeserializer(),
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

  static buildPacket1Deserializer(): SourceFile {
    return {
      name: "Packet1Deserializer.cs",
      content: "Packet1Deserializer content",
    };
  }

  static buildPacket2Deserializer(): SourceFile {
    return {
      name: "Packet2Deserializer.cs",
      content: "Packet2Deserializer content",
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

  static buildNumbersCustomTypeDeserializer(): SourceFile {
    return {
      name: "NumbersCustomTypeDeserializer.cs",
      content: "NumbersCustomTypeDeserializer content",
    };
  }

  static buildNumbersCustomTypeSerializer(): SourceFile {
    return {
      name: "NumbersCustomTypeSerializer.cs",
      content: "NumbersCustomTypeSerializer content",
    };
  }

  static buildNumbersCustomTypeModel() {
    return {
      name: "NumbersCustomTypeModel.cs",
      content: "NumbersCustomTypeModel content",
    };
  }

  static buildStringsCustomTypeDeserializer(): SourceFile {
    return {
      name: "StringsCustomTypeDeserializer.cs",
      content: "StringsCustomTypeDeserializer content",
    };
  }

  static buildStringsCustomTypeSerializer(): SourceFile {
    return {
      name: "StringsCustomTypeSerializer.cs",
      content: "StringsCustomTypeSerializer content",
    };
  }

  static buildStringsCustomTypeModel() {
    return {
      name: "StringsCustomTypeModel.cs",
      content: "StringsCustomTypeModel content",
    };
  }
}
