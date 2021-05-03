import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import * as elasticsearch from 'elasticsearch-browser';
import Product from '../models/product';
import {PagedResult} from '../models/paged-result';
import {PagingQuery} from '../models/paging-query';

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

  getAllProducts(query: PagingQuery): Observable<PagedResult<Product>> {
    return new Observable<PagedResult<Product>>(subscriber => {
      this.client.search({
        index: environment.elasticIndexName,
        body: {
          from: query.from,
          size: query.size
        }
      }, (err, result) => this.getProducts(err, result, subscriber));
    });
  }

  getFullTextSearchResults(query: PagingQuery, fuzziness: string = undefined): Observable<PagedResult<Product>> {
    const body = {
      from: query.from,
      size: query.size,
      query: {
        nested: {
          path: 'search_data',
            query: {
            match: {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              'search_data.full_text': {
                query: query.queryPhrase
              }
            }
          }
        }
      }
    };

    if(fuzziness){
      body.query.nested.query.match['search_data.full_text']['fuzziness'] = fuzziness;
    }

    return new Observable<PagedResult<Product>>(subscriber => {
      this.client.search({
        index: environment.elasticIndexName,
        body
      }, (err, result) => this.getProducts(err, result, subscriber));
    });
  }

  getSuggestions(query: PagingQuery): Observable<PagedResult<Product>> {
    return new Observable<PagedResult<Product>>(subscriber => {
      this.client.search({
        index: environment.elasticIndexName,
        body: {
          from: query.from,
          size: query.size,
          suggest: {
            autocomplete: {
              prefix: query.queryPhrase,
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
            const results = result.suggest.autocomplete[0].options.map(x => this.mapToProduct(x));
            const page = new PagedResult<Product>();
            page.data = results;
            page.total = results.length;

            subscriber.next(page);
          } else {
            subscriber.next(new PagedResult<Product>());
          }
        }
      });
    });
  }

  private getProducts(err, result, subscriber) {
    if (err) {
      subscriber.error(err);
      return;
    }

    if (result
      && result.hits
      && result.hits.hits
      && result.hits.hits.length > 0) {
      const results = result.hits.hits.map(x => this.mapToProduct(x));
      const page = new PagedResult<Product>();
      page.data = results;
      page.total = result.hits.total.value;
      subscriber.next(page);
    } else {
      subscriber.next(new PagedResult<Product>());
    }
  }

  private mapToProduct(responseElement: any): Product {
    // eslint-disable-next-line no-underscore-dangle
    const inputProduct = responseElement._source.search_result_data;
    const product = new Product();
    product.id = inputProduct.id;
    product.name = inputProduct.name;
    product.numberOfProducts = inputProduct.number_of_products;
    product.category = inputProduct.category;
    product.supplier = inputProduct.supplier;
    product.quantityPerUnit = inputProduct.quantity_per_unit;

    return product;
  }
}
