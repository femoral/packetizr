import { SourceFile } from "../../../src/code-generation/SourceFile";

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

  static buildListWithCustomTypes(): SourceFile[] {
    return [
      this.buildPacket1Model(),
      this.buildPacket2Model(),
      this.buildPacket1Serializer(),
      this.buildPacket2Serializer(),
      this.buildPacket1Deserializer(),
      this.buildPacket2Deserializer(),
      this.buildNumbersCustomTypeModel(),
      this.buildStringsCustomTypeModel(),
      this.buildNumbersCustomTypeSerializer(),
      this.buildStringsCustomTypeSerializer(),
      this.buildNumbersCustomTypeDeserializer(),
      this.buildStringsCustomTypeDeserializer(),
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

  static buildNumbersCustomTypeDeserializer(): SourceFile {
    return {
      name: "NumbersCustomTypeDeserializer.go",
      content: "NumbersCustomTypeDeserializer content",
    };
  }

  static buildNumbersCustomTypeSerializer(): SourceFile {
    return {
      name: "NumbersCustomTypeSerializer.go",
      content: "NumbersCustomTypeSerializer content",
    };
  }

  static buildNumbersCustomTypeModel() {
    return {
      name: "NumbersCustomTypeModel.go",
      content: "NumbersCustomTypeModel content",
    };
  }

  static buildStringsCustomTypeDeserializer(): SourceFile {
    return {
      name: "StringsCustomTypeDeserializer.go",
      content: "StringsCustomTypeDeserializer content",
    };
  }

  static buildStringsCustomTypeSerializer(): SourceFile {
    return {
      name: "StringsCustomTypeSerializer.go",
      content: "StringsCustomTypeSerializer content",
    };
  }

  static buildStringsCustomTypeModel() {
    return {
      name: "StringsCustomTypeModel.go",
      content: "StringsCustomTypeModel content",
    };
  }
}
