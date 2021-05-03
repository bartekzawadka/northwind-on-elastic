import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import * as elasticsearch from 'elasticsearch-browser';
import Product from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ElasticsearchService {
  client: elasticsearch.Client;

  constructor() {

    const options = {
      host: environment.elasticEndpoint,
      http: {
        cors: {
          enabled: false
        }
      },
      ssl: {
        rejectUnauthorized: false
      }
    };

    if (environment.elasticUsername) {
      options['auth'] = {
        username: environment.elasticUsername,
        password: environment.elasticPassword
      };
    }

    this.client = new elasticsearch.Client(options);
  }

  getFullTextSearchResults(phrase: string, fuzziness: string = undefined) {
    const body = {
      query: {
        nested: {
          path: 'search_data',
            query: {
            match: {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              'search_data.full_text': {
                query: phrase
              }
            }
          }
        }
      }
    };

    if(fuzziness){
      body.query.nested.query.match['search_data.full_text']['fuzziness'] = fuzziness;
    }

    return new Observable<any>(subscriber => {
      this.client.search({
        index: environment.elasticIndexName,
        body
      }, (err, result) => {
        if (err) {
          subscriber.error(err);
          return;
        }

        console.log(result);

        if (result
          && result.hits
          && result.hits.hits
          && result.hits.hits.length > 0) {
          const results = result.hits.hits.map(x => {
            const inputProduct = x._source.search_result_data;

            const product = new Product();
            product.id = inputProduct.id;
            product.name = inputProduct.name;
            product.numberOfProducts = inputProduct.number_of_products;
            product.category = inputProduct.category;
            product.supplier = inputProduct.supplier;
            product.quantityPerUnit = inputProduct.quantity_per_unit;

            return product;
          });
          subscriber.next(results);
        } else {
          subscriber.next([]);
        }
      });
    });
  }

  getSuggestions(phrase: string): Observable<Product[]> {
    return new Observable<any>(subscriber => {
      this.client.search({
        index: environment.elasticIndexName,
        body: {
          suggest: {
            autocomplete: {
              prefix: phrase,
              completion: {
                field: 'completion_terms'
              }
            }
          }
        }
      }, (err, result) => {
        if (err) {
          subscriber.error(err);
        } else {
          if (
            result.suggest
            && result.suggest.autocomplete
            && result.suggest.autocomplete.length > 0
            && result.suggest.autocomplete[0].options
            && result.suggest.autocomplete[0].options.length > 0) {
            const results = result.suggest.autocomplete[0].options.map(x => {
              const inputProduct = x._source.search_result_data;
              const product = new Product();
              product.id = inputProduct.id;
              product.name = inputProduct.name;
              product.numberOfProducts = inputProduct.number_of_products;
              product.category = inputProduct.category;
              product.supplier = inputProduct.supplier;
              product.quantityPerUnit = inputProduct.quantity_per_unit;

              return product;
            });

            subscriber.next(results);
          } else {
            subscriber.next([]);
          }
        }
      });
    });
  }
}
