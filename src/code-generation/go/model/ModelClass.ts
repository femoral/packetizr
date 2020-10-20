export interface ModelClass {
  className: string;
  header?: number;
  isPacket: boolean;
  fields: {
    type: string;
    name: string;
    isObject: boolean;
  }[];
}
