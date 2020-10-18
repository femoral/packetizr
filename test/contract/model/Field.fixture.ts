import { Field, FieldTypes } from "../../../src/contract/model/Field";

export class FieldFixture {
  static buildListOfAllKindsOfFieldsWithLowerCaseNames(): Field[] {
    return [
      new Field("int32Field", FieldTypes.INT32),
      new Field("float32Field", FieldTypes.FLOAT32),
      new Field("int16Field", FieldTypes.INT16),
      new Field("int8Field", FieldTypes.INT8),
      new Field("varcharField", FieldTypes.VARCHAR),
      new Field("charField", FieldTypes.CHAR, 10),
      new Field("uint32Field", FieldTypes.UINT32),
      new Field("uint16Field", FieldTypes.UINT16),
      new Field("uint8Field", FieldTypes.UINT8),
    ];
  }

  static buildListOfStringFields(): Field[] {
    return [
      new Field("varcharField", FieldTypes.VARCHAR),
      new Field("charField", FieldTypes.CHAR, 4),
    ];
  }

  static buildListOfNumberFields(): Field[] {
    return [
      new Field("int32Field", FieldTypes.INT32),
      new Field("float32Field", FieldTypes.FLOAT32),
      new Field("int16Field", FieldTypes.INT16),
      new Field("int8Field", FieldTypes.INT8),
      new Field("uint32Field", FieldTypes.UINT32),
      new Field("uint16Field", FieldTypes.UINT16),
      new Field("uint8Field", FieldTypes.UINT8),
    ];
  }

  static buildListOfAllKindOfFields(): Field[] {
    return [
      new Field("Int32Field", FieldTypes.INT32),
      new Field("Float32Field", FieldTypes.FLOAT32),
      new Field("Int16Field", FieldTypes.INT16),
      new Field("Int8Field", FieldTypes.INT8),
      new Field("VarcharField", FieldTypes.VARCHAR),
      new Field("CharField", FieldTypes.CHAR, 10),
      new Field("Uint32Field", FieldTypes.UINT32),
      new Field("Uint16Field", FieldTypes.UINT16),
      new Field("Uint8Field", FieldTypes.UINT8),
    ];
  }

  static buildListOfCustomFields(): Field[] {
    return [
      new Field(
        "customAttributeOfNumbers",
        FieldTypes.OBJECT,
        0,
        "NumbersObject"
      ),
      new Field(
        "customAttributeOfStrings",
        FieldTypes.OBJECT,
        0,
        "StringsObject"
      ),
    ];
  }

  static buildListWithParentObject() {
    return [new Field("parentField", FieldTypes.OBJECT, 0, "ParentObject")];
  }

  static buildListWithChildObject() {
    return [new Field("childField", FieldTypes.OBJECT, 0, "ChildObject")];
  }
}
