import * as yaml from "yaml";
import * as fs from "fs";
import { ContractReader } from "./ContractReader";
import { Contract } from "../contract/model/Contract";
import { Packet } from "../contract/model/Packet";
import { Field, FieldTypes } from "../contract/model/Field";
import { TypeSchema } from "../contract/model/TypeSchema";

export class YamlContractReader implements ContractReader {
  constructor(private _path: string) {}

  public async read(): Promise<any> {
    const buffer = await fs.promises.readFile(this._path);
    const rawContract = yaml.parse(buffer.toString());
    const schemaKeys = Object.keys(rawContract.components?.schemas || {});
    const schemas = this.mapSchemas(
      rawContract.components?.schemas || [],
      schemaKeys
    );
    this.validateCircularReferences(schemas);
    return new Contract(this.mapPackets(rawContract.packets, schemaKeys), [
      ...schemas,
    ]);
  }

  private mapSchemas(rawSchemas: any, schemaKeys: string[]) {
    return schemaKeys.map(
      (schemaKey) =>
        new TypeSchema(
          schemaKey,
          Object.keys(rawSchemas[schemaKey]).map((fieldName: any) => {
            let rawField = rawSchemas[schemaKey][fieldName];
            return new Field(
              fieldName,
              rawField.type,
              rawField.length,
              this.getSchema(rawField, schemaKeys)
            );
          })
        )
    );
  }

  private mapPackets(packets: any[], schemas: string[]) {
    return packets.map(
      (rawPacket: any) =>
        new Packet(
          rawPacket.name,
          rawPacket.header,
          Object.keys(rawPacket.fields).map((fieldName: any) => {
            let rawField = rawPacket.fields[fieldName];
            return new Field(
              fieldName,
              rawField.type,
              rawField.length,
              this.getSchema(rawField, schemas)
            );
          })
        )
    );
  }

  private getSchema(rawField: any, schemas: string[]): string | undefined {
    if (rawField.type === FieldTypes.OBJECT) {
      const foundSchema = schemas.find((schema) => schema === rawField.schema);
      if (!foundSchema) throw new Error(`Schema not found: ${rawField.schema}`);
      return foundSchema;
    } else if (
      rawField.type === FieldTypes.ARRAY &&
      rawField.items.type === FieldTypes.OBJECT
    ) {
      return this.getSchema(rawField.items, schemas);
    } else if (rawField.type === FieldTypes.ARRAY) {
      return rawField.items.type;
    }
  }

  private validateCircularReferences(schemas: TypeSchema[]) {
    for (const schema of schemas) {
      this.seekReferencesOnSchemaFields(schemas, schema, [schema.name]);
    }
  }

  private seekReferencesOnSchemaFields(
    schemas: TypeSchema[],
    schema: TypeSchema,
    history: string[]
  ) {
    for (const field of schema.fields) {
      if (history.find((s) => s === field.schema)) {
        throw new Error(
          `Circular reference found on: ${schema.name}->${field.name}`
        );
      } else if (field.type === FieldTypes.OBJECT) {
        const fieldSchema = schemas.find((s) => s.name === field.schema)!;
        this.seekReferencesOnSchemaFields(schemas, fieldSchema, [
          ...history,
          fieldSchema.name,
        ]);
      }
    }
  }
}
