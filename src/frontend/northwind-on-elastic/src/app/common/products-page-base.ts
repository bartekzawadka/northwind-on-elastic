import {AlertController} from '@ionic/angular';
import {FilterServiceService} from '../services/filter-service.service';
import {OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {PagedResult} from '../models/paged-result';
import Product from '../models/product';
import {PagingQuery} from '../models/paging-query';

export abstract class ProductsPageBase implements OnInit, OnDestroy {
  resultsPageSize = 10;
  productsPage: PagedResult<Product> = new PagedResult<Product>();
  protected searchPhraseValue = '';
  private filterChangeSubscription: Subscription;

  protected constructor(
    protected filterService: FilterServiceService,
    protected alertController: AlertController) {
  }

  ngOnInit() {
    this.filterChangeSubscription = this.filterService.filterChanged.subscribe(value => {
      this.searchPhraseValue = value;
      this.loadInitPage(this.buildPagingQuery(true));
    });
  }

  ngOnDestroy() {
    this.filterChangeSubscription.unsubscribe();
  }

  loadInitPage(query: PagingQuery) {
    this.getData(query)
      .subscribe(results => {
        this.productsPage = results;
      }, async error => await this.handleGetDataError(error));
  }

  loadMoreData() {
    this.getData(this.buildPagingQuery(false))
      .subscribe(results => {
        const page = new PagedResult<Product>();
        page.data = this.productsPage.data;
        results.data.forEach(value => {
          page.data.push(value);
        });
        page.total = results.total;
        this.productsPage = page;
      }, async error => await this.handleGetDataError(error));
  }

  protected async showMessage(header: string, message: string){
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  protected buildPagingQuery(reset: boolean): PagingQuery {
    const query = new PagingQuery();
    query.size = this.resultsPageSize;
    query.queryPhrase = this.searchPhraseValue;
    query.from = reset ? 0 : this.productsPage.data.length;
    return query;
  }

  protected async handleGetDataError(error){
    console.log(error);
    await this.showMessage('Error', 'Receving results failed. Check console for details');
  }

  public abstract getData(query: PagingQuery): Observable<PagedResult<Product>>;
}
