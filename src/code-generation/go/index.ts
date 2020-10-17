import { CodeGenerator } from "../CodeGenerator";
import { GoCodeGenerator } from "./GoCodeGenerator";
import { ModelGenerator } from "./ModelGenerator";
import { TemplateContainer } from "./TemplateContainer";
import { SerializerGenerator } from "./SerializerGenerator";
import { DeserializerGenerator } from "./DeserializerGenerator";

export function generator(): CodeGenerator {
  let templateContainer = new TemplateContainer();

  return new GoCodeGenerator(
    new ModelGenerator(templateContainer),
    new SerializerGenerator(templateContainer),
    new DeserializerGenerator(templateContainer)
  );
}
