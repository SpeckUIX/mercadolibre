import axios from "axios";

import { ItemsResponse, ItemResponse } from "../models/response.model";
import { Categories } from "../models/item.model";

import { author } from "../general.mock";

export class ItemsController {
  private apiURL = "https://api.mercadolibre.com";

  /**
   * Trae los productos de acuerdo a una consulta enviada
   * @param query Cadena de texto que sirve para encontrar productos especificos
   * @returns Promise<ItemsResponse>
   */
  getByQuery(query: string): Promise<ItemsResponse> {
    return new Promise((resolve, reject) => {
      if (query) {
        const responseData: ItemsResponse = {
          author,
        };
  
        axios
          .get(`${this.apiURL}/sites/MLA/search?q=${query}`)
          .then((response) => {
            /**
             * categories: variable que obtiene las categorías de acuerdo a la búsqueda dada, filtrando los datos y mostrando solo el nombre de la categoría
             */
            const categories: Categories = (
              response.data?.available_filters || []
            )
              .filter((item) => item.id === "category")
              .map((item) => item.values.map((value) => value.name));

            responseData.categories = categories;
            responseData.items = response.data?.results.map((item) => {
              /**
               * priceData: variable que muestra un objeto de precios priorizados por tipo "promotion" ya que este trae el precio decimal siempre y cuando exista, si no existe igual muestra el precio entero
               */
              const priceData =
                item.prices.prices.filter((price) => price.type === "promotion")
                  .length > 0
                  ? item.prices.prices.filter(
                      (price) => price.type === "promotion"
                    )
                  : item.prices.prices.filter(
                      (price) => price.type === "standard"
                    );

              const priceSplit = priceData[0].amount.toString().split('.');

              return {
                id: item.id,
                title: item.title,
                price: {
                  currency: item.currency_id,
                  amount: priceSplit[0],
                  decimals: priceSplit[1] || '00',
                },
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: item.free_shipping,
              };
            });

            resolve(responseData);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("Not query found");
      }
    });
  }

  /**
   * Trae el producto de acuerdo al id enviado
   * @param id Cadena de texto que sirve para identificar un producto especifico
   * @returns Promise<ItemResponse>
   */
  getById(id: string): Promise<ItemResponse> {
    return new Promise((resolve, reject) => {
      if (id) {
        const responseData: ItemResponse = {
          author,
        };
  
        axios
          .get(`${this.apiURL}/items/${id}`)
          .then((response) => {
            axios
              .get(`${this.apiURL}/items/${id}/description`)
              .then((responseDescription) => {
                const product = response.data;
                /**
                 * description: variable que trae la descripción del producto priorizando el 'text' sobre el 'plain_text'
                 */
                const description =
                  responseDescription.data?.text?.length > 0
                    ? responseDescription.data?.text
                    : responseDescription.data?.plain_text;

                responseData.item = {
                  condition: product.condition,
                  description,
                  free_shipping: product.shipping.free_shipping,
                  id: product.id,
                  picture: product.pictures[0],
                  price: {
                    currency: product.currency_id,
                    amount: product.price,
                    decimals: null
                  },
                  sold_quantity: product.sold_quantity,
                  title: product.title,
                };

                resolve(responseData);
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("Not id found");
      }
    });
  }
}
