import { SourceFile } from "../code-generation/SourceFile";
import { SourceCodeWriter } from "./SourceCodeWriter";
import * as fs from "fs";
import logger from "../common/Logger";

export class FileSystemSourceCodeWriter implements SourceCodeWriter {
  constructor(private _outputDirectory: string) {}

  async write(files: SourceFile[]): Promise<void> {
    if (!fs.existsSync(this._outputDirectory))
      await fs.promises.mkdir(this._outputDirectory, { recursive: true });

    await Promise.all(
      files.map((file) =>
        fs.promises.writeFile(
          `${this._outputDirectory}/${file.name}`,
          file.content
        )
      )
    );

    logger.info(`generated ${files.length} files in: ${this._outputDirectory}`);
  }
}
