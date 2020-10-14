import { TemplateContainer } from "../../../src/code-generation/csharp/TemplateContainer";

const templateContainer = new TemplateContainer();

export class TemplateContainerFixture {
  static getContainer() {
    return templateContainer;
  }
}
