import { Field } from "./Field";

export class Packet {
  constructor(
    private _name: string,
    private _header: number,
    private _fields: Field[]
  ) {}

  get name(): string {
    return this._name;
  }

  get header(): number {
    return this._header;
  }

  get fields(): Field[] {
    return this._fields;
  }
}
