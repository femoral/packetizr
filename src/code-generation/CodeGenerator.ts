import { Contract } from "../contract/model/Contract";
import { SourceFile } from "./SourceFile";

export interface CodeGenerator {
  generate(contract: Contract): SourceFile[];
}
