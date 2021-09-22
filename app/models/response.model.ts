import { Author } from "./author.model";
import { Item, Categories } from "./item.model";
import { ItemDetail } from "./item-detail.model";

export interface ItemsResponse {
  author: Author;
  categories?: Categories;
  items?: Item[];
}

export interface ItemResponse {
  author: Author;
  item?: ItemDetail;
}
