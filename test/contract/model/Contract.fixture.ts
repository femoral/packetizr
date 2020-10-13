import { Contract } from "../../../src/contract/model/Contract";
import { PacketFixture } from "./Packet.fixture";

export class ContractFixture {
  static buildOk() {
    return new Contract([
      PacketFixture.buildPacketWithNumbersOnly(),
      PacketFixture.buildPacketWithStringsOnly(),
    ]);
  }
}
