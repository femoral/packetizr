import * as fs from "fs";
import { PacketFixture } from "../../contract/model/Packet.fixture";
import { SerializerGenerator } from "../../../src/code-generation/csharp/SerializerGenerator";
import { TemplateContainerFixture } from "./TemplateContainer.fixture";
import { TypeSchemaFixture } from "../../contract/model/TypeSchema.fixture";

describe("generate is called with packet", () => {
  it("should return SourceFile with serializer name and content, given packet has upper case packet name and fields", () => {
    let serializerGenerator = new SerializerGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/TestMessagePacketSerializer.cs`)
      .toString();

    let file = serializerGenerator.generate(
      PacketFixture.buildWithAllFieldsAndUpperCaseFirstCharacter()
    );

    expect(file.name).toEqual("TestMessagePacketSerializer.cs");
    expect(file.content).toEqual(expectedFileContent);
  });

  it("should return SourceFile with serializer name and content, given packet has lower case packet name and fields", () => {
    let serializerGenerator = new SerializerGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/TestMessagePacketSerializer.cs`)
      .toString();

    let file = serializerGenerator.generate(
      PacketFixture.buildWithAllFieldsAndLowerCaseFirstCharacter()
    );

    expect(file.name).toEqual("TestMessagePacketSerializer.cs");
    expect(file.content).toEqual(expectedFileContent);
  });
});

describe("generate is called with TypeSchema", () => {
  it("Should return SourceFile with class serializer containing schema fields, given schema has upper case packet name and fields", () => {
    let serializerGenerator = new SerializerGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/CustomTypeDtoPacketSerializer.cs`)
      .toString();
    let file = serializerGenerator.generate(
      TypeSchemaFixture.buildCustomType()
    );

    expect(file.name).toEqual("CustomTypeDtoPacketSerializer.cs");
    expect(file.content).toEqual(expectedFileContent);
  });

  it("Should return SourceFile with class serializer containing schema fields, given schema has lower case packet name and fields", () => {
    let serializerGenerator = new SerializerGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/CustomTypeDtoPacketSerializer.cs`)
      .toString();
    let file = serializerGenerator.generate(
      TypeSchemaFixture.buildCustomType()
    );

    expect(file.name).toEqual("CustomTypeDtoPacketSerializer.cs");
    expect(file.content).toEqual(expectedFileContent);
  });
});
