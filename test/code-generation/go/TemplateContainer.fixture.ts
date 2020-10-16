import { TemplateContainer } from "../../../src/code-generation/go/TemplateContainer";

const templateContainer = new TemplateContainer();

export class TemplateContainerFixture {
  static getContainer() {
    return templateContainer;
  }
}
