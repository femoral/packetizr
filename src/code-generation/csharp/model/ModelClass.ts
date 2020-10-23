export interface ModelClass {
  isPacket: boolean;
  className: string;
  header?: number;
  fields: {
    type: string;
    name: string;
    isArray: boolean;
  }[];
}
