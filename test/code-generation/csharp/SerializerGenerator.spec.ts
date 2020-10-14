import * as fs from "fs";
import { PacketFixture } from "../../contract/model/Packet.fixture";
import { SerializerGenerator } from "../../../src/code-generation/csharp/SerializerGenerator";
import { TemplateContainerFixture } from "./TemplateContainer.fixture";

describe("compile is called with packet", () => {
  it("should return SourceFile with serializer name and content", () => {
    let serializerGenerator = new SerializerGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/TestMessagePacketSerializer.cs`)
      .toString();

    let file = serializerGenerator.compile(PacketFixture.buildWithAllFields());

    expect(file.name).toEqual("TestMessagePacketSerializer.cs");
    expect(file.content).toEqual(expectedFileContent);
  });
});
