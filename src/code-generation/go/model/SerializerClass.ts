export interface SerializerClass {
  importBinaryPackage: boolean;
  isPacket: boolean;
  model: {
    pascalCaseName: string;
    camelCaseName: string;
  };
  fields: {
    camelCaseName: string;
    pascalCaseName: string;
    isNumeric: boolean;
    isChar: boolean;
    isVarchar: boolean;
    isObject: boolean;
    schema?: string;
  }[];
  schemas: { pascalCaseName: string; camelCaseName: string }[];
}
