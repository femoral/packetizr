export interface DeserializerClass {
  modelType: string;
  fields: {
    name: string;
    length: number;
    isNumeric: boolean;
    isChar: boolean;
    isVarchar: boolean;
    isSingleByte: boolean;
    bitConverterMethod: string;
  }[];
}
