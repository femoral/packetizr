export interface DeserializerClass {
  modelType: string;
  hasCustomTypes: boolean;
  fields: {
    name: string;
    length: number;
    isNumeric: boolean;
    isChar: boolean;
    isVarchar: boolean;
    isSingleByte: boolean;
    isObject: boolean;
    bitConverterMethod: string;
  }[];
  schemas: { pascalCaseName: string; camelCaseName: string }[];
}
