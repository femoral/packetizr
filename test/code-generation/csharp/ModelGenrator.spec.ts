import * as fs from "fs";
import { ModelGenerator } from "../../../src/code-generation/csharp/ModelGenerator";
import { PacketFixture } from "../../contract/model/Packet.fixture";
import { TemplateContainerFixture } from "./TemplateContainer.fixture";

it("Should return SourceFile with class model containing packet fields, when called with packet", () => {
  let modelGenerator = new ModelGenerator(
    TemplateContainerFixture.getContainer()
  );
  let expectedFileContent = fs
    .readFileSync(`${__dirname}/fixture/TestMessage.cs`)
    .toString();
  let file = modelGenerator.compile(PacketFixture.buildWithAllFields());

  expect(file.name).toEqual("TestMessage.cs");
  expect(file.content).toEqual(expectedFileContent);
});
