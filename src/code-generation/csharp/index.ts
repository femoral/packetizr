import { CodeGenerator } from "../CodeGenerator";
import { CSharpCodeGenerator } from "./CSharpCodeGenerator";
import { ModelGenerator } from "./ModelGenerator";
import { BoilerplateGenerator } from "./BoilerplateGenerator";
import { SerializerGenerator } from "./SerializerGenerator";
import { TemplateContainer } from "./TemplateContainer";
import { DeserializerGenerator } from "./DeserializerGenerator";

export function generator(): CodeGenerator {
  let templateContainer = new TemplateContainer();

  return new CSharpCodeGenerator(
    new BoilerplateGenerator(templateContainer),
    new ModelGenerator(templateContainer),
    new SerializerGenerator(templateContainer),
    new DeserializerGenerator(templateContainer)
  );
}
