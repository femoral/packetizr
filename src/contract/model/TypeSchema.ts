import { Field } from "./Field";

export class TypeSchema {
  constructor(private _name: string, private _fields: Field[]) {}

  get name(): string {
    return this._name;
  }

  get fields(): Field[] {
    return this._fields;
  }
}
