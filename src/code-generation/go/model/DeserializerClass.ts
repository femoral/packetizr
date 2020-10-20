export interface DeserializerClass {
  importBinaryPackage: boolean;
  modelType: string;
  fields: {
    pascalCaseName: string;
    camelCaseName: string;
    length: number;
    isNumeric: boolean;
    isChar: boolean;
    isVarchar: boolean;
    isObject: boolean;
    schema?: string;
  }[];
  schemas: { pascalCaseName: string; camelCaseName: string }[];
}
