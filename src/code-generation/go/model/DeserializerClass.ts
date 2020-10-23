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
    isArray: boolean;
    schema?: {
      camelCaseName: string;
      pascalCaseName: string;
    };
    items?: {
      isNumeric: boolean;
      isChar: boolean;
      isVarchar: boolean;
      isPrimitive: boolean;
      type: string;
    };
  }[];
  schemas: { pascalCaseName: string; camelCaseName: string }[];
}
