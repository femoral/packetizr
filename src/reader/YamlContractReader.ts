import * as yaml from "yaml";
import * as fs from "fs";
import { ContractReader } from "./ContractReader";
import { Contract } from "../contract/model/Contract";
import { Packet } from "../contract/model/Packet";
import { Field } from "../contract/model/Field";

export class YamlContractReader implements ContractReader {
  constructor(private _path: string) {}

  public async read(): Promise<any> {
    let buffer = await fs.promises.readFile(this._path);
    return new Contract(
      yaml.parse(buffer.toString()).packets.map(
        (rawPacket: any) =>
          new Packet(
            rawPacket.name,
            rawPacket.header,
            Object.keys(rawPacket.fields).map(
              (fieldName: any) =>
                new Field(
                  fieldName,
                  rawPacket.fields[fieldName].type,
                  rawPacket.fields[fieldName].length
                )
            )
          )
      )
    );
  }
}
