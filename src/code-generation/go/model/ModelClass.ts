export interface ModelClass {
  className: string;
  header: number;
  fields: {
    type: string;
    name: string;
  }[];
}
