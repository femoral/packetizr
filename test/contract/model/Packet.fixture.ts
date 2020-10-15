import { Packet } from "../../../src/contract/model/Packet";
import { Field, FieldTypes } from "../../../src/contract/model/Field";

export class PacketFixture {
  static buildPacketWithStringsOnly() {
    return new Packet("StringsMessage", 2, [
      new Field("varcharField", FieldTypes.VARCHAR),
      new Field("charField", FieldTypes.CHAR, 4),
    ]);
  }

  static buildPacketWithNumbersOnly() {
    return new Packet("NumbersMessage", 1, [
      new Field("int32Field", FieldTypes.INT32),
      new Field("float32Field", FieldTypes.FLOAT32),
      new Field("int16Field", FieldTypes.INT16),
      new Field("int8Field", FieldTypes.INT8),
      new Field("uint32Field", FieldTypes.UINT32),
      new Field("uint16Field", FieldTypes.UINT16),
      new Field("uint8Field", FieldTypes.UINT8),
    ]);
  }

  static buildWithAllFields() {
    return new Packet("TestMessage", 1, [
      new Field("Int32Field", FieldTypes.INT32),
      new Field("Float32Field", FieldTypes.FLOAT32),
      new Field("Int16Field", FieldTypes.INT16),
      new Field("Int8Field", FieldTypes.INT8),
      new Field("VarcharField", FieldTypes.VARCHAR),
      new Field("CharField", FieldTypes.CHAR, 10),
      new Field("Uint32Field", FieldTypes.UINT32),
      new Field("Uint16Field", FieldTypes.UINT16),
      new Field("Uint8Field", FieldTypes.UINT8),
    ]);
  }
}
