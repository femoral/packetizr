export interface SerializerClass {
  modelType: string;
  fields: {
    name: string;
    isNumeric: boolean;
    isChar: boolean;
    isVarchar: boolean;
  }[];
}
