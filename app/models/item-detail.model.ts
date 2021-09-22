import { Item } from './item.model';

export interface ItemDetail extends Item {
  sold_quantity: number;
  description: string;
}
