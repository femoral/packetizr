import { SourceFile } from "../../src/code-generation/SourceFile";

export class SourceFileFixture {
  static buildListOk(): SourceFile[] {
    return [this.buildFile1(), this.buildFile2()];
  }

  static buildFile2() {
    return { name: "file2", content: "content2" };
  }

  static buildFile1() {
    return { name: "file1", content: "content1" };
  }
}