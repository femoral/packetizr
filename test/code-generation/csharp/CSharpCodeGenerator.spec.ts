import { deepEqual, instance, mock, when } from "ts-mockito";
import { ModelGenerator } from "../../../src/code-generation/csharp/ModelGenerator";
import { ContractFixture } from "../../contract/model/Contract.fixture";
import { PacketFixture } from "../../contract/model/Packet.fixture";
import { CSharpCodeGenerator } from "../../../src/code-generation/csharp/CSharpCodeGenerator";
import { SourceFileFixture } from "../SourceFile.fixture";

it("Should return an array of source files, when compile is called with contract", () => {
  let modelGeneratorMock = mock(ModelGenerator);
  let generator = new CSharpCodeGenerator(instance(modelGeneratorMock));
  when(
    modelGeneratorMock.compile(
      deepEqual(PacketFixture.buildPacketWithNumbersOnly())
    )
  ).thenReturn(SourceFileFixture.buildFile1());
  when(
    modelGeneratorMock.compile(
      deepEqual(PacketFixture.buildPacketWithStringsOnly())
    )
  ).thenReturn(SourceFileFixture.buildFile2());

  let sourceFiles = generator.compile(ContractFixture.buildOk());

  expect(sourceFiles).toEqual(SourceFileFixture.buildListOk());
});
