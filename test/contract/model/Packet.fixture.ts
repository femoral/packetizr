import { Packet } from "../../../src/contract/model/Packet";
import { FieldFixture } from "./Field.fixture";

export class PacketFixture {
  static buildPacketWithStringsOnly(): Packet {
    return new Packet(
      "StringsMessage",
      2,
      FieldFixture.buildListOfStringFields()
    );
  }

  static buildPacketWithNumbersOnly(): Packet {
    return new Packet(
      "NumbersMessage",
      1,
      FieldFixture.buildListOfNumberFields()
    );
  }

  static buildWithAllFieldsAndUpperCaseFirstCharacter(): Packet {
    return new Packet(
      "TestMessage",
      1,
      FieldFixture.buildListOfAllKindOfFields()
    );
  }

  static buildWithAllFieldsAndLowerCaseFirstCharacter(): Packet {
    return new Packet(
      "testMessage",
      1,
      FieldFixture.buildListOfAllKindsOfFieldsWithLowerCaseNames()
    );
  }

  static buildPacketWithCustomTypes() {
    return new Packet(
      "CustomMessage",
      1,
      FieldFixture.buildListOfCustomFields()
    );
  }

  static buildPacketWithNestedCustomTypes() {
    return new Packet(
      "CustomMessage",
      1,
      FieldFixture.buildListWithParentObject()
    );
  }

  static buildPacketWithArrayFieldOnly() {
    return new Packet(
      "ArrayMessage",
      1,
      FieldFixture.buildListWithArrayField()
    );
  }

  static buildContractWithPrimitiveArrayField() {
    return new Packet(
      "ArrayOfPrimitivesMessage",
      1,
      FieldFixture.buildContractWithPrimitiveArrayField()
    );
  }
}
