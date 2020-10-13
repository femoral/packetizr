export class Field {
  get name(): string {
    return this._name;
  }

  get type(): FieldTypes {
    return this._type;
  }

  get length(): number | undefined {
    return this._length;
  }

  constructor(
    private _name: string,
    private _type: FieldTypes,
    private _length?: number
  ) {}
}

export enum FieldTypes {
  FLOAT32 = "float32",
  INT32 = "int32",
  INT16 = "int16",
  INT8 = "int8",
  UINT32 = "uint32",
  UINT16 = "uint16",
  UINT8 = "uint8",
  VARCHAR = "varchar",
  CHAR = "char",
}
