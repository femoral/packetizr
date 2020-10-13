import { CodeGenerator } from "../CodeGenerator";
import { CSharpCodeGenerator } from "./CSharpCodeGenerator";
import { ModelGenerator } from "./ModelGenerator";

export function generator(): CodeGenerator {
  return new CSharpCodeGenerator(new ModelGenerator());
}