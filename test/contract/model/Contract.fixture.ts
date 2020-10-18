import { Contract } from "../../../src/contract/model/Contract";
import { PacketFixture } from "./Packet.fixture";
import { TypeSchema } from "../../../src/contract/model/TypeSchema";
import { FieldFixture } from "./Field.fixture";
import { TypeSchemaFixture } from "./TypeSchema.fixture";

export class ContractFixture {
  static buildPlainContract() {
    return new Contract(
      [
        PacketFixture.buildPacketWithNumbersOnly(),
        PacketFixture.buildPacketWithStringsOnly(),
      ],
      []
    );
  }

  static buildContractWithSchema() {
    return new Contract(
      [
        PacketFixture.buildPacketWithNumbersOnly(),
        PacketFixture.buildPacketWithStringsOnly(),
      ],
      [
        new TypeSchema("NumbersObject", FieldFixture.buildListOfNumberFields()),
        new TypeSchema("StringsObject", FieldFixture.buildListOfStringFields()),
      ]
    );
  }

  static buildContractWithSchemaAndCustomTypes() {
    return new Contract(
      [PacketFixture.buildPacketWithCustomTypes()],
      [
        TypeSchemaFixture.buildNumbersObjectSchema(),
        TypeSchemaFixture.buildStringsObjectSchema(),
      ]
    );
  }

  static buildContractWithNestedCustomTypes() {
    return new Contract(
      [PacketFixture.buildPacketWithNestedCustomTypes()],
      [
        TypeSchemaFixture.buildParentObjectSchema(),
        TypeSchemaFixture.buildChildObjectSchema(),
      ]
    );
  }
}
