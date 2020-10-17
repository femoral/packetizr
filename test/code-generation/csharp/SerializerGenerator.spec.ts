import * as fs from "fs";
import { PacketFixture } from "../../contract/model/Packet.fixture";
import { SerializerGenerator } from "../../../src/code-generation/csharp/SerializerGenerator";
import { TemplateContainerFixture } from "./TemplateContainer.fixture";

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
