import * as fs from "fs";
import { BoilerplateGenerator } from "../../../src/code-generation/csharp/BoilerplateGenerator";

describe("compile is called", () => {
  it("Should return array with deserializer interface source file", () => {
    let serializerGenerator = new BoilerplateGenerator();
    let expectedFileContent = fs
      .readFileSync(`${__dirname}/fixture/IPacketSerializer.cs`)
      .toString();

    let file = serializerGenerator.compile();

    expect(file[0].name).toEqual("IPacketSerializer.cs");
    expect(file[0].content).toEqual(expectedFileContent);
  });
});
