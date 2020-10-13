import { ContractReader } from "../reader/ContractReader";
import { Contract } from "./model/Contract";

export class GetContractUseCase {
  constructor(private _reader: ContractReader) {}

  public async execute(): Promise<Contract> {
    return await this._reader.read();
  }
}
