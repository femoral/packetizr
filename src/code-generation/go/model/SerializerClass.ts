export interface SerializerClass {
  modelType: string;
  fields: {
    endianness: string;
    camelCaseName: string;
    pascalCaseName: string;
    isNumeric: boolean;
    isChar: boolean;
    isVarchar: boolean;
  }[];
}
