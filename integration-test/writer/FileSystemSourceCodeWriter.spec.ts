import { FileSystemSourceCodeWriter } from "../../src/writer/FileSystemSourceCodeWriter";
import * as rimraf from "rimraf";
import { SourceFileFixture } from "../../test/code-generation/SourceFile.fixture";
import * as fs from "fs";
import { mkdirSync } from "fs";

const outputDirectory = `${__dirname}/out`;

describe("write is called with source code files", () => {
  beforeEach(() => {
    rimraf.sync(outputDirectory);
  });

  afterEach(() => {
    rimraf.sync(outputDirectory);
  });

  it("should write files on output dir", async () => {
    const fileSystemSourceCodeWriter = new FileSystemSourceCodeWriter(
      outputDirectory
    );

    await fileSystemSourceCodeWriter.write(SourceFileFixture.buildListOk());

    expect(
      (await fs.promises.readFile(`${outputDirectory}/file1`)).toString()
    ).toEqual("content1");
    expect(
      (await fs.promises.readFile(`${outputDirectory}/file2`)).toString()
    ).toEqual("content2");
  });

  describe("output folder already exists", () => {
    beforeEach(() => {
      mkdirSync(outputDirectory, { recursive: true });
    });

    it("should write files inside output dir", async () => {
      const fileSystemSourceCodeWriter = new FileSystemSourceCodeWriter(
        outputDirectory
      );

      await fileSystemSourceCodeWriter.write([SourceFileFixture.buildFile1()]);

      expect(
        (await fs.promises.readFile(`${outputDirectory}/file1`)).toString()
      ).toEqual("content1");
    });
  });
});