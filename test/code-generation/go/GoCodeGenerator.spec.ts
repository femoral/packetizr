import { deepEqual, instance, mock, when } from "ts-mockito";
import { ModelGenerator } from "../../../src/code-generation/go/ModelGenerator";
import { ContractFixture } from "../../contract/model/Contract.fixture";
import { PacketFixture } from "../../contract/model/Packet.fixture";
import { GoSourceFileFixture } from "./GoSourceFile.fixture";
import { GoCodeGenerator } from "../../../src/code-generation/go/GoCodeGenerator";
import { SerializerGenerator } from "../../../src/code-generation/go/SerializerGenerator";
import { DeserializerGenerator } from "../../../src/code-generation/go/DeserializerGenerator";
import { TypeSchemaFixture } from "../../contract/model/TypeSchema.fixture";

it("Should return an array of source files, when generate is called with contract", () => {
  let generator = setUp();

  let sourceFiles = generator.generate(ContractFixture.buildPlainContract());

  expect(sourceFiles.sort()).toEqual(GoSourceFileFixture.buildListOk().sort());
});

it("Should return an array of source files, when compile is called with contract without schemas", () => {
  let generator = setUp();

  let sourceFiles = generator.generate(
    ContractFixture.buildContractWithCustomTypes()
  );

  expect(sourceFiles.sort()).toEqual(
    GoSourceFileFixture.buildListWithCustomTypes().sort()
  );
});

function setUp() {
  let modelGeneratorMock = mock(ModelGenerator);
  let serializerGeneratorMock = mock(SerializerGenerator);
  let deserializerGeneratorMock = mock(DeserializerGenerator);
  let generator = new GoCodeGenerator(
    instance(modelGeneratorMock),
    instance(serializerGeneratorMock),
    instance(deserializerGeneratorMock)
  );
  setupModelMocks(modelGeneratorMock);
  setupSerializerMocks(serializerGeneratorMock);
  setupDeserializerMocks(deserializerGeneratorMock);
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

  when(
    modelGeneratorMock.generate(
      deepEqual(TypeSchemaFixture.buildStringsObjectSchema())
    )
  ).thenReturn(GoSourceFileFixture.buildStringsCustomTypeModel());
  when(
    modelGeneratorMock.generate(
      deepEqual(TypeSchemaFixture.buildNumbersObjectSchema())
    )
  ).thenReturn(GoSourceFileFixture.buildNumbersCustomTypeModel());
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

  when(
    serializerGeneratorMock.generate(
      deepEqual(TypeSchemaFixture.buildStringsObjectSchema())
    )
  ).thenReturn(GoSourceFileFixture.buildStringsCustomTypeSerializer());
  when(
    serializerGeneratorMock.generate(
      deepEqual(TypeSchemaFixture.buildNumbersObjectSchema())
    )
  ).thenReturn(GoSourceFileFixture.buildNumbersCustomTypeSerializer());
}

function setupDeserializerMocks(
  deserializerGeneratorMock: DeserializerGenerator
) {
  when(
    deserializerGeneratorMock.generate(
      deepEqual(PacketFixture.buildPacketWithNumbersOnly())
    )
  ).thenReturn(GoSourceFileFixture.buildPacket1Deserializer());
  when(
    deserializerGeneratorMock.generate(
      deepEqual(PacketFixture.buildPacketWithStringsOnly())
    )
  ).thenReturn(GoSourceFileFixture.buildPacket2Deserializer());

  when(
    deserializerGeneratorMock.generate(
      deepEqual(TypeSchemaFixture.buildStringsObjectSchema())
    )
  ).thenReturn(GoSourceFileFixture.buildStringsCustomTypeDeserializer());
  when(
    deserializerGeneratorMock.generate(
      deepEqual(TypeSchemaFixture.buildNumbersObjectSchema())
    )
  ).thenReturn(GoSourceFileFixture.buildNumbersCustomTypeDeserializer());
}
