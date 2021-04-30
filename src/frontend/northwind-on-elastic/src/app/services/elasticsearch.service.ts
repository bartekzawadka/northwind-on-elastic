import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import * as elasticsearch from 'elasticsearch-browser';
//import {Client} from '@elastic/elasticsearch';
//const { Client } = require('@elastic/elasticsearch');

@Injectable({
  providedIn: 'root'
})
export class ElasticsearchService {
  client: elasticsearch.Client;

  constructor() {
    console.log(environment.elasticEndpoint);

    this.client = new elasticsearch.Client({
      //node: 'https://' + environment.elasticEndpoint,
      host: 'https://' + environment.elasticEndpoint,
      auth: {
        username: environment.elasticUsername,
        password: environment.elasticPassword
      },
      //rejectUnauthorized: false,
      ssl: {
        rejectUnauthorized: true
      }
    });
  }

  getSuggestions(phrase: string): Observable<any> {
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
          subscriber.next(result.body);
        }
      });
    });
  }
}
