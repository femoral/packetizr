import * as yaml from "yaml"
import * as fs from "fs";
import {Reader} from "./Reader";

export class YamlReader implements Reader {

    constructor(private _path: string) {
    }

    public async read(): Promise<any> {
        let buffer = await fs.promises.readFile(this._path);
        return yaml.parse(buffer.toString());
    }
}
