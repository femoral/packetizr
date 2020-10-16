import { CodeGenerator } from "../CodeGenerator";
import { GoCodeGenerator } from "./GoCodeGenerator";
import { ModelGenerator } from "./ModelGenerator";
import { TemplateContainer } from "./TemplateContainer";

export function generator(): CodeGenerator {
  let templateContainer = new TemplateContainer();

  return new GoCodeGenerator(new ModelGenerator(templateContainer));
}
