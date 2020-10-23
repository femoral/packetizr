import { Packet } from "./Packet";
import { TypeSchema } from "./TypeSchema";

export class Contract {
  constructor(
    private _packets: Packet[],
    private _typeSchemas: TypeSchema[] = []
  ) {}

  get packets(): Packet[] {
    return this._packets;
  }

  get typeSchemas(): TypeSchema[] {
    return this._typeSchemas;
  }
}
