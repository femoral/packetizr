import { instance, mock, when } from "ts-mockito";
import { ContractReader } from "../../src/reader/ContractReader";
import { ContractFixture } from "./model/Contract.fixture";
import { GetContractUseCase } from "../../src/contract/GetContractUseCase";

describe("execute is called and reader resolved raw contract", () => {
  it("Should resolve Contract", async () => {
    let readerMock = mock<ContractReader>();
    let contractLoader = new GetContractUseCase(instance(readerMock));
    when(readerMock.read()).thenResolve(ContractFixture.buildPlainContract());

    let contract = await contractLoader.execute();

    expect(contract).toEqual(ContractFixture.buildPlainContract());
  });
});
