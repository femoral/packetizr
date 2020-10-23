export interface SerializerClass {
  isPacket: boolean;
  modelType: string;
  hasCustomTypes: boolean;
  model: {
    pascalCaseName: string;
    camelCaseName: string;
  };
  fields: {
    name: string;
    schema: string;
    isNumeric: boolean;
    isChar: boolean;
    isVarchar: boolean;
    isArray: boolean;
    items?: {
      isNumeric: boolean;
      isChar: boolean;
      isVarchar: boolean;
      isPrimitive: boolean;
    };
  }[];
  schemas: { pascalCaseName: string; camelCaseName: string }[];
}
