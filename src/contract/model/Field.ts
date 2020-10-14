export class Field {
  get name(): string {
    return this._name;
  }

  get type(): FieldTypes {
    return this._type;
  }

  get length(): number {
    return this._length;
  }

  constructor(
    private _name: string,
    private _type: FieldTypes,
    private _length = 0
  ) {
    switch (_type) {
      case FieldTypes.FLOAT32:
        this._length = 4;
        break;
      case FieldTypes.INT32:
        this._length = 4;
        break;
      case FieldTypes.INT16:
        this._length = 2;
        break;
      case FieldTypes.INT8:
        this._length = 1;
        break;
      case FieldTypes.UINT32:
        this._length = 4;
        break;
      case FieldTypes.UINT16:
        this._length = 2;
        break;
      case FieldTypes.UINT8:
        this._length = 1;
        break;
      case FieldTypes.VARCHAR:
        this._length = 0;
        break;
      case FieldTypes.CHAR:
        break;
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
}
