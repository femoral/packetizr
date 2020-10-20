export class Field {
  constructor(
    private readonly _name: string,
    private readonly _type: FieldTypes,
    private readonly _length = 0,
    private readonly _schema?: string
  ) {
    this._length = this._getFieldLength(this._type);
  }

  get name(): string {
    return this._name;
  }

  get type(): FieldTypes {
    return this._type;
  }

  get length(): number {
    return this._length;
  }

  get schema(): string {
    return this._schema || this._type;
  }

  private _getFieldLength(type: FieldTypes): number {
    switch (type) {
      case FieldTypes.FLOAT32:
        return 4;
      case FieldTypes.INT32:
        return 4;
      case FieldTypes.INT16:
        return 2;
      case FieldTypes.INT8:
        return 1;
      case FieldTypes.UINT32:
        return 4;
      case FieldTypes.UINT16:
        return 2;
      case FieldTypes.UINT8:
        return 1;
      case FieldTypes.VARCHAR:
        return 0;
      default:
        return this._length;
    }
  }
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
  OBJECT = "object",
}
