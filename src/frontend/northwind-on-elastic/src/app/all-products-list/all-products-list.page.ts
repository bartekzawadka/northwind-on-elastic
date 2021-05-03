import { Component } from '@angular/core';
import {ProductsPageBase} from '../common/products-page-base';
import {FilterServiceService} from '../services/filter-service.service';
import {ElasticsearchService} from '../services/elasticsearch.service';
import {AlertController} from '@ionic/angular';
import {PagingQuery} from '../models/paging-query';
import {Observable} from 'rxjs';
import {PagedResult} from '../models/paged-result';
import Product from '../models/product';

@Component({
  selector: 'app-all-products-list',
  templateUrl: './all-products-list.page.html',
  styleUrls: ['./all-products-list.page.scss'],
})
export class AllProductsListPage extends ProductsPageBase {

  constructor(
    protected filterService: FilterServiceService,
    protected alertController: AlertController,
    private elasticsearchService: ElasticsearchService) {
    super(filterService, alertController);
  }

  getData(query: PagingQuery): Observable<PagedResult<Product>> {
    return this.elasticsearchService.getAllProducts(query);
  }
}
