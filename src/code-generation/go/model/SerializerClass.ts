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
    isArray: boolean;
    schema?: string;
    items?: {
      isNumeric: boolean;
      isChar: boolean;
      isVarchar: boolean;
      isPrimitive: boolean;
    };
  }[];
  schemas: { pascalCaseName: string; camelCaseName: string }[];
}
