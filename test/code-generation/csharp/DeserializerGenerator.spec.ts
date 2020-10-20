import * as fs from "fs";
import { PacketFixture } from "../../contract/model/Packet.fixture";
import { TemplateContainerFixture } from "./TemplateContainer.fixture";
import { DeserializerGenerator } from "../../../src/code-generation/csharp/DeserializerGenerator";
import { TypeSchemaFixture } from "../../contract/model/TypeSchema.fixture";

describe("generate is called with packet", () => {
  it("should return SourceFile with serializer name and content, given packet has upper case packet name and fields", () => {
    let deserializerGenerator = new DeserializerGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/TestMessagePacketDeserializer.cs`)
      .toString();

    let file = deserializerGenerator.generate(
      PacketFixture.buildWithAllFieldsAndUpperCaseFirstCharacter()
    );

    expect(file.name).toEqual("TestMessagePacketDeserializer.cs");
    expect(file.content).toEqual(expectedFileContent);
  });

  it("should return SourceFile with serializer name and content, given packet has lower case packet name and fields", () => {
    let deserializerGenerator = new DeserializerGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/TestMessagePacketDeserializer.cs`)
      .toString();

    let file = deserializerGenerator.generate(
      PacketFixture.buildWithAllFieldsAndLowerCaseFirstCharacter()
    );

    expect(file.name).toEqual("TestMessagePacketDeserializer.cs");
    expect(file.content).toEqual(expectedFileContent);
  });
});

describe("generate is called with packet", () => {
  it("should return SourceFile with serializer name and content, given packet has upper case packet name and fields", () => {
    let deserializerGenerator = new DeserializerGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/TestMessagePacketDeserializer.cs`)
      .toString();

    let file = deserializerGenerator.generate(
      PacketFixture.buildWithAllFieldsAndUpperCaseFirstCharacter()
    );

    expect(file.name).toEqual("TestMessagePacketDeserializer.cs");
    expect(file.content).toEqual(expectedFileContent);
  });

  it("should return SourceFile with serializer name and content, given packet has lower case packet name and fields", () => {
    let deserializerGenerator = new DeserializerGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/TestMessagePacketDeserializer.cs`)
      .toString();

    let file = deserializerGenerator.generate(
      PacketFixture.buildWithAllFieldsAndLowerCaseFirstCharacter()
    );

    expect(file.name).toEqual("TestMessagePacketDeserializer.cs");
    expect(file.content).toEqual(expectedFileContent);
  });
});

describe("generate is called with TypeSchema", () => {
  it("Should return SourceFile with class deserializer containing schema fields, given schema has upper case packet name and fields", () => {
    let deserializerGenerator = new DeserializerGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/CustomTypeDtoPacketDeserializer.cs`)
      .toString();
    let file = deserializerGenerator.generate(
      TypeSchemaFixture.buildCustomType()
    );

    expect(file.name).toEqual("CustomTypeDtoPacketDeserializer.cs");
    expect(file.content).toEqual(expectedFileContent);
  });

  it("Should return SourceFile with class deserializer containing schema fields, given schema has lower case packet name and fields", () => {
    let deserializerGenerator = new DeserializerGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/CustomTypeDtoPacketDeserializer.cs`)
      .toString();
    let file = deserializerGenerator.generate(
      TypeSchemaFixture.buildCustomType()
    );

    expect(file.name).toEqual("CustomTypeDtoPacketDeserializer.cs");
    expect(file.content).toEqual(expectedFileContent);
  });
});
