import { Component } from '@angular/core';
import Product from '../models/product';
import {ProductsPageBase} from '../common/products-page-base';
import {AlertController} from '@ionic/angular';
import {FilterServiceService} from '../services/filter-service.service';
import {ElasticsearchService} from '../services/elasticsearch.service';
import {PagedResult} from '../models/paged-result';
import {PagingQuery} from '../models/paging-query';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-fuzziness-results',
  templateUrl: './fuzziness-results.page.html',
  styleUrls: ['./fuzziness-results.page.scss'],
})
export class FuzzinessResultsPage extends ProductsPageBase {

  constructor(
    protected alertController: AlertController,
    protected filterService: FilterServiceService,
    private elasticsearchService: ElasticsearchService) {
    super(filterService, alertController);
  }

  getData(query: PagingQuery): Observable<PagedResult<Product>> {
    return this.elasticsearchService.getFullTextSearchResults(query, 'AUTO');
  }
}
