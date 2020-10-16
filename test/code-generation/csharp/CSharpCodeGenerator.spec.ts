import { deepEqual, instance, mock, when } from "ts-mockito";
import { ModelGenerator } from "../../../src/code-generation/csharp/ModelGenerator";
import { ContractFixture } from "../../contract/model/Contract.fixture";
import { PacketFixture } from "../../contract/model/Packet.fixture";
import { CSharpCodeGenerator } from "../../../src/code-generation/csharp/CSharpCodeGenerator";
import { SerializerGenerator } from "../../../src/code-generation/csharp/SerializerGenerator";
import { BoilerplateGenerator } from "../../../src/code-generation/csharp/BoilerplateGenerator";
import { CSharpSourceFileFixture } from "./CSharpSourceFile.fixture";
import { DeserializerGenerator } from "../../../src/code-generation/csharp/DeserializerGenerator";

it("Should return an array of source files, when compile is called with contract", () => {
  let generator = setUp();

  let sourceFiles = generator.generate(ContractFixture.buildOk());

  expect(sourceFiles.sort()).toEqual(
    CSharpSourceFileFixture.buildListOk().sort()
  );
});

function setUp() {
  let serializerGeneratorMock = mock(SerializerGenerator);
  let deserializerGeneratorMock = mock(DeserializerGenerator);
  let boilerplateGeneratorMock = mock(BoilerplateGenerator);
  let modelGeneratorMock = mock(ModelGenerator);
  let generator = new CSharpCodeGenerator(
    instance(boilerplateGeneratorMock),
    instance(modelGeneratorMock),
    instance(serializerGeneratorMock),
    instance(deserializerGeneratorMock)
  );
  setupModelMocks(modelGeneratorMock);
  setupSerializerMocks(serializerGeneratorMock);
  setupBoilerplateMocks(boilerplateGeneratorMock);
  setupDeserializerMocks(deserializerGeneratorMock);
  return generator;
}

function setupModelMocks(modelGeneratorMock: ModelGenerator) {
  when(
    modelGeneratorMock.compile(
      deepEqual(PacketFixture.buildPacketWithNumbersOnly())
    )
  ).thenReturn(CSharpSourceFileFixture.buildPacket1Model());
  when(
    modelGeneratorMock.compile(
      deepEqual(PacketFixture.buildPacketWithStringsOnly())
    )
  ).thenReturn(CSharpSourceFileFixture.buildPacket2Model());
}

function setupSerializerMocks(serializerGeneratorMock: SerializerGenerator) {
  when(
    serializerGeneratorMock.compile(
      deepEqual(PacketFixture.buildPacketWithNumbersOnly())
    )
  ).thenReturn(CSharpSourceFileFixture.buildPacket1Serializer());
  when(
    serializerGeneratorMock.compile(
      deepEqual(PacketFixture.buildPacketWithStringsOnly())
    )
  ).thenReturn(CSharpSourceFileFixture.buildPacket2Serializer());
}

function setupDeserializerMocks(
  deserializerGeneratorMock: DeserializerGenerator
) {
  when(
    deserializerGeneratorMock.compile(
      deepEqual(PacketFixture.buildPacketWithNumbersOnly())
    )
  ).thenReturn(CSharpSourceFileFixture.buildPacket1Deserializer());
  when(
    deserializerGeneratorMock.compile(
      deepEqual(PacketFixture.buildPacketWithStringsOnly())
    )
  ).thenReturn(CSharpSourceFileFixture.buildPacket2Deserializer());
}

function setupBoilerplateMocks(boilerplateGeneratorMock: BoilerplateGenerator) {
  when(boilerplateGeneratorMock.compile()).thenReturn([
    CSharpSourceFileFixture.buildSerializerInterface(),
  ]);
}
