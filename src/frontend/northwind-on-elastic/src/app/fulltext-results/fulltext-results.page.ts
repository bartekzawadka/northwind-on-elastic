import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilterServiceService} from '../services/filter-service.service';
import {ElasticsearchService} from '../services/elasticsearch.service';
import {ProductsPageBase} from '../common/products-page-base';
import {AlertController} from '@ionic/angular';
import {PagingQuery} from '../models/paging-query';

@Component({
  selector: 'app-fulltext-results',
  templateUrl: './fulltext-results.page.html',
  styleUrls: ['./fulltext-results.page.scss'],
})
export class FulltextResultsPage extends ProductsPageBase implements OnInit, OnDestroy {

  constructor(
    protected filterService: FilterServiceService,
    private elasticsearchService: ElasticsearchService,
    protected alertController: AlertController) {
    super(filterService, alertController);
  }

  getData(query: PagingQuery){
    return this.elasticsearchService.getFullTextSearchResults(query);
  }
}
