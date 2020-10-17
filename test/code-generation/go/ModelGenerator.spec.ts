import { ModelGenerator } from "../../../src/code-generation/go/ModelGenerator";
import { TemplateContainerFixture } from "../go/TemplateContainer.fixture";
import * as fs from "fs";
import { PacketFixture } from "../../contract/model/Packet.fixture";

describe("generate is called with packet", () => {
  it("should return SourceFile with the model corresponding to the packet, given packet has upper case packet name and fields", () => {
    let modelGenerator = new ModelGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/test-message.go`)
      .toString();

    let file = modelGenerator.generate(
      PacketFixture.buildWithAllFieldsAndUpperCaseFirstCharacter()
    );

    expect(file.name).toEqual("test-message.go");
    expect(file.content).toEqual(expectedFileContent);
  });

  it("should return SourceFile with the model corresponding to the packet, given packet has lower case packet name and fields", () => {
    let modelGenerator = new ModelGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/test-message.go`)
      .toString();

    let file = modelGenerator.generate(
      PacketFixture.buildWithAllFieldsAndLowerCaseFirstCharacter()
    );

    expect(file.name).toEqual("test-message.go");
    expect(file.content).toEqual(expectedFileContent);
  });
});
