import {Packet} from "./Packet";

export class Contract {
    constructor(private _packets: Packet[]) {
    }

    get packets(): Packet[] {
        return this._packets;
    }
}