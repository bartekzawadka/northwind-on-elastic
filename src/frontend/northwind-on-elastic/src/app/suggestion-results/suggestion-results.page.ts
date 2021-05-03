import {Component} from '@angular/core';
import {FilterServiceService} from '../services/filter-service.service';
import {ElasticsearchService} from '../services/elasticsearch.service';
import Product from '../models/product';
import {ProductsPageBase} from '../common/products-page-base';
import {AlertController} from '@ionic/angular';
import {PagedResult} from '../models/paged-result';
import {Observable} from 'rxjs';
import {PagingQuery} from '../models/paging-query';

@Component({
  selector: 'app-suggestion-results',
  templateUrl: './suggestion-results.page.html',
  styleUrls: ['./suggestion-results.page.scss'],
})
export class SuggestionResultsPage extends ProductsPageBase {

  constructor(
    protected filterService: FilterServiceService,
    protected alertController: AlertController,
    private elasticSearchService: ElasticsearchService) {
    super(filterService, alertController);
  }

  getData(query: PagingQuery): Observable<PagedResult<Product>> {
    return this.elasticSearchService.getSuggestions(query);
  }
}
