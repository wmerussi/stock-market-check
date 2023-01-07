import { Items, Meta } from './';

export interface StockData {
  meta: Meta;
  items: Items;
  error?: string;
}
