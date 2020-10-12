import { instance, mock, when } from "ts-mockito";
import { Reader } from "../src/Reader";
import { Contract } from "../src/model/Contract";
import { Packet } from "../src/model/Packet";
import { Field } from "../src/model/Field";

export class ContractLoaderSpec {
  constructor(private _reader: Reader) {}

  public async load() {
    let rawContract = await this._reader.read();

    return new Contract(
      rawContract.packets.map(
        (rawPacket: any) =>
          new Packet(
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

function buildLoadedContract() {
  return new Contract([
    new Packet(1, [
      new Field("int32Field", "int32"),
      new Field("float32Field", "float32"),
      new Field("int16Field", "int16"),
      new Field("int8Field", "int8"),
    ]),
    new Packet(2, [
      new Field("varcharField", "varchar"),
      new Field("charField", "char", 4),
    ]),
  ]);
}

it("Should resolve Contract, when load is called, given reader resolved", async () => {
  let readerMock = mock<Reader>();
  let contractLoader = new ContractLoaderSpec(instance(readerMock));
  when(readerMock.read()).thenResolve(buildRawContract());

  let contract = await contractLoader.load();

  expect(contract).toEqual(buildLoadedContract());
});

function buildRawContract() {
  return {
    packets: [
      {
        header: 1,
        fields: {
          int32Field: {
            type: "int32",
          },
          float32Field: {
            type: "float32",
          },
          int16Field: {
            type: "int16",
          },
          int8Field: {
            type: "int8",
          },
        },
      },
      {
        header: 2,
        fields: {
          varcharField: {
            type: "varchar",
          },
          charField: {
            type: "char",
            length: 4,
          },
        },
      },
    ],
  };
}
