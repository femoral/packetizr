export interface DeserializerClass {
  modelType: string;
  fields: {
    pascalCaseName: string;
    camelCaseName: string;
    length: number;
    isNumeric: boolean;
    isChar: boolean;
    isVarchar: boolean;
    endianness: string;
  }[];
}
