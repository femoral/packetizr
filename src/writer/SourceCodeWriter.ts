import { SourceFile } from "../code-generation/SourceFile";

export interface SourceCodeWriter {
  write(files: SourceFile[]): void;
}
