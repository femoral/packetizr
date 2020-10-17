import { deepEqual, instance, mock, when } from "ts-mockito";
import { ModelGenerator } from "../../../src/code-generation/go/ModelGenerator";
import { ContractFixture } from "../../contract/model/Contract.fixture";
import { PacketFixture } from "../../contract/model/Packet.fixture";
import { GoSourceFileFixture } from "./GoSourceFile.fixture";
import { GoCodeGenerator } from "../../../src/code-generation/go/GoCodeGenerator";
import { SerializerGenerator } from "../../../src/code-generation/go/SerializerGenerator";

it("Should return an array of source files, when generate is called with contract", () => {
  let generator = setUp();

  let sourceFiles = generator.generate(ContractFixture.buildOk());

  expect(sourceFiles.sort()).toEqual(GoSourceFileFixture.buildListOk().sort());
});

function setUp() {
  let modelGeneratorMock = mock(ModelGenerator);
  let serializerGeneratorMock = mock(SerializerGenerator);
  let generator = new GoCodeGenerator(
    instance(modelGeneratorMock),
    instance(serializerGeneratorMock)
  );
  setupModelMocks(modelGeneratorMock);
  setupSerializerMocks(serializerGeneratorMock);
  return generator;
}

function setupModelMocks(modelGeneratorMock: ModelGenerator) {
  when(
    modelGeneratorMock.generate(
      deepEqual(PacketFixture.buildPacketWithNumbersOnly())
    )
  ).thenReturn(GoSourceFileFixture.buildPacket1Model());
  when(
    modelGeneratorMock.generate(
      deepEqual(PacketFixture.buildPacketWithStringsOnly())
    )
  ).thenReturn(GoSourceFileFixture.buildPacket2Model());
}

function setupSerializerMocks(serializerGeneratorMock: SerializerGenerator) {
  when(
    serializerGeneratorMock.generate(
      deepEqual(PacketFixture.buildPacketWithNumbersOnly())
    )
  ).thenReturn(GoSourceFileFixture.buildPacket1Serializer());
  when(
    serializerGeneratorMock.generate(
      deepEqual(PacketFixture.buildPacketWithStringsOnly())
    )
  ).thenReturn(GoSourceFileFixture.buildPacket2Serializer());
}
