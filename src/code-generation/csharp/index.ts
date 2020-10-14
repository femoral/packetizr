import { CodeGenerator } from "../CodeGenerator";
import { CSharpCodeGenerator } from "./CSharpCodeGenerator";
import { ModelGenerator } from "./ModelGenerator";
import { BoilerplateGenerator } from "./BoilerplateGenerator";
import { SerializerGenerator } from "./SerializerGenerator";

export function generator(): CodeGenerator {
  return new CSharpCodeGenerator(
    new BoilerplateGenerator(),
    new ModelGenerator(),
    new SerializerGenerator()
  );
}
