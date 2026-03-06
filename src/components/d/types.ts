export interface DataEntry {
  id: string;
  data: any;
  tags: string[];
  apiKey: string;
  config: {
    ap1: 'enable' | 'disable';
  };
}