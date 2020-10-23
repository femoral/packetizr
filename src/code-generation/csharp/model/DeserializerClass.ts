export interface DeserializerClass {
  modelType: string;
  hasCustomTypes: boolean;
  fields: {
    name: {
      pascalCaseName: string;
      camelCaseName: string;
    };
    schema: string;
    length: number;
    isNumeric: boolean;
    isChar: boolean;
    isVarchar: boolean;
    isSingleByte: boolean;
    isObject: boolean;
    isArray: boolean;
    bitConverterMethod: string;
  }[];
  items?: {
    type: string;
    isNumeric: boolean;
    isChar: boolean;
    isVarchar: boolean;
    isPrimitive: boolean;
    isSingleByte: boolean;
    isSigned: boolean;
  };
  schemas: { pascalCaseName: string; camelCaseName: string }[];
}
