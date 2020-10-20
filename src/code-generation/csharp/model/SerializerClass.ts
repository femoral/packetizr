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
    isNumeric: boolean;
    isChar: boolean;
    isVarchar: boolean;
  }[];
  schemas: { pascalCaseName: string; camelCaseName: string }[];
}
