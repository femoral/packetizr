import * as fs from "fs";
import { PacketFixture } from "../../contract/model/Packet.fixture";
import { SerializerGenerator } from "../../../src/code-generation/go/SerializerGenerator";
import { TemplateContainerFixture } from "./TemplateContainer.fixture";

describe("compile is called with packet", () => {
  it("should return SourceFile with serializer name and content", () => {
    let serializerGenerator = new SerializerGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/test-message.serializer.go`)
      .toString();

    let file = serializerGenerator.generate(PacketFixture.buildWithAllFields());

    expect(file.name).toEqual("test-message.serializer.go");
    expect(file.content).toEqual(expectedFileContent);
  });
});
