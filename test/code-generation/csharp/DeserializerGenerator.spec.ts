import * as fs from "fs";
import { PacketFixture } from "../../contract/model/Packet.fixture";
import { TemplateContainerFixture } from "./TemplateContainer.fixture";
import { DeserializerGenerator } from "../../../src/code-generation/csharp/DeserializerGenerator";

describe("compile is called with packet", () => {
  it("should return SourceFile with serializer name and content", () => {
    let deserializerGenerator = new DeserializerGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/TestMessagePacketDeserializer.cs`)
      .toString();

    let file = deserializerGenerator.compile(
      PacketFixture.buildWithAllFields()
    );

    expect(file.name).toEqual("TestMessagePacketDeserializer.cs");
    expect(file.content).toEqual(expectedFileContent);
  });
});
