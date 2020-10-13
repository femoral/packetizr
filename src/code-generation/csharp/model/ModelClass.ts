export interface ModelClass {
  model: {
    className: string;
    header: number;
    fields: {
      type: string;
      name: string;
    }[];
  };
}
