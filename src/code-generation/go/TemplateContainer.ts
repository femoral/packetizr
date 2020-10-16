import { readdirSync, readFileSync } from "fs";
import * as handlebars from "handlebars";

export class TemplateContainer {
  private _templates = new Map<string, HandlebarsTemplateDelegate>();

  constructor() {
    this.loadPartials();
    this.loadTemplates();
  }

  build<TContext>(name: string, context?: TContext): string {
    let templateDelegate = this._templates.get(name);

    if (!templateDelegate) throw new Error(`unregistered template: ${name}`);

    return templateDelegate(context);
  }

  private loadTemplates() {
    readdirSync(`${__dirname}/template`, { withFileTypes: true })
      .filter((entry) => entry.isFile() && /.*\.hbs$/.test(entry.name))
      .forEach((entry) =>
        this._templates.set(
          entry.name.replace(".hbs", ""),
          handlebars.compile(
            readFileSync(`${__dirname}/template/${entry.name}`).toString()
          )
        )
      );
  }

  private loadPartials() {
    readdirSync(`${__dirname}/template/partial`, {
      withFileTypes: true,
    })
      .filter((entry) => entry.isFile() && /.*\.hbs$/.test(entry.name))
      .forEach((entry) =>
        handlebars.registerPartial(
          entry.name.replace(".hbs", ""),
          readFileSync(`${__dirname}/template/partial/${entry.name}`).toString()
        )
      );
  }
}
