import * as fs from "fs";
import { PacketFixture } from "../../contract/model/Packet.fixture";
import { SerializerGenerator } from "../../../src/code-generation/go/SerializerGenerator";
import { TemplateContainerFixture } from "./TemplateContainer.fixture";
import { TypeSchemaFixture } from "../../contract/model/TypeSchema.fixture";

describe("generate is called with packet", () => {
  it("should return SourceFile with serializer name and content, given packet has upper case packet name and fields", () => {
    let serializerGenerator = new SerializerGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/test-message.serializer.go`)
      .toString();

    let file = serializerGenerator.generate(
      PacketFixture.buildWithAllFieldsAndUpperCaseFirstCharacter()
    );

    expect(file.name).toEqual("test-message.serializer.go");
    expect(file.content).toEqual(expectedFileContent);
  });

  it("should return SourceFile with serializer name and content, given packet has lower case packet name and fields", () => {
    let serializerGenerator = new SerializerGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/test-message.serializer.go`)
      .toString();

    let file = serializerGenerator.generate(
      PacketFixture.buildWithAllFieldsAndLowerCaseFirstCharacter()
    );

    expect(file.name).toEqual("test-message.serializer.go");
    expect(file.content).toEqual(expectedFileContent);
  });
});

describe("generate is called with type schema", () => {
  it("should return SourceFile with serializer name and content, given type schema has upper case packet name and fields", () => {
    let serializerGenerator = new SerializerGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/custom-type-dto.serializer.go`)
      .toString();

    let file = serializerGenerator.generate(
      TypeSchemaFixture.buildCustomType()
    );

    expect(file.name).toEqual("custom-type-dto.serializer.go");
    expect(file.content).toEqual(expectedFileContent);
  });

  it("should return SourceFile with serializer name and content, given type schema has lower case packet name and fields", () => {
    let serializerGenerator = new SerializerGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/custom-type-dto.serializer.go`)
      .toString();

    let file = serializerGenerator.generate(
      TypeSchemaFixture.buildCustomType()
    );

    expect(file.name).toEqual("custom-type-dto.serializer.go");
    expect(file.content).toEqual(expectedFileContent);
  });

  it("should not include binary package, if schema does not have primitive types", () => {
    let serializerGenerator = new SerializerGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/parent-object-dto.serializer.go`)
      .toString();

    let file = serializerGenerator.generate(
      TypeSchemaFixture.buildParentObjectSchema()
    );

    expect(file.name).toEqual("parent-object-dto.serializer.go");
    expect(file.content).toEqual(expectedFileContent);
  });
});
