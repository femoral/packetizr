import * as fs from "fs";
import { ModelGenerator } from "../../../src/code-generation/csharp/ModelGenerator";
import { PacketFixture } from "../../contract/model/Packet.fixture";
import { TemplateContainerFixture } from "./TemplateContainer.fixture";

describe("generate is called with packet", () => {
  it("Should return SourceFile with class model containing packet fields, given packet has upper case packet name and fields", () => {
    let modelGenerator = new ModelGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/TestMessage.cs`)
      .toString();
    let file = modelGenerator.generate(
      PacketFixture.buildWithAllFieldsAndUpperCaseFirstCharacter()
    );

    expect(file.name).toEqual("TestMessage.cs");
    expect(file.content).toEqual(expectedFileContent);
  });

  it("Should return SourceFile with class model containing packet fields, given packet has lower case packet name and fields", () => {
    let modelGenerator = new ModelGenerator(
      TemplateContainerFixture.getContainer()
    );
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/TestMessage.cs`)
      .toString();
    let file = modelGenerator.generate(
      PacketFixture.buildWithAllFieldsAndLowerCaseFirstCharacter()
    );

    expect(file.name).toEqual("TestMessage.cs");
    expect(file.content).toEqual(expectedFileContent);
  });
});
