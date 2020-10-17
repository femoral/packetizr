import * as fs from "fs";
import { PacketFixture } from "../../contract/model/Packet.fixture";
import { TemplateContainerFixture } from "./TemplateContainer.fixture";
import { DeserializerGenerator } from "../../../src/code-generation/go/DeserializerGenerator";

describe("generate is called with packet", () => {
  it("should return SourceFile with serializer name and content", () => {
    let deserializerGenerator = new DeserializerGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/test-message.deserializer.go`)
      .toString();

    let file = deserializerGenerator.generate(
      PacketFixture.buildWithAllFields()
    );

    expect(file.name).toEqual("test-message.deserializer.go");
    expect(file.content).toEqual(expectedFileContent);
  });
});
