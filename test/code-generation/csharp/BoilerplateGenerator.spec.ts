import { BoilerplateGenerator } from "../../../src/code-generation/csharp/BoilerplateGenerator";
import { CSharpSourceFileFixture } from "./CSharpSourceFile.fixture";
import { TemplateContainerFixture } from "./TemplateContainer.fixture";

describe("generate is called", () => {
  it("Should return array with deserializer interface source file", () => {
    let serializerGenerator = new BoilerplateGenerator(
      TemplateContainerFixture.getContainer()
    );

    let files = serializerGenerator.generate();

    expect(files.sort()).toEqual(
      CSharpSourceFileFixture.buildBoilerplateFiles().sort()
    );
  });
});
