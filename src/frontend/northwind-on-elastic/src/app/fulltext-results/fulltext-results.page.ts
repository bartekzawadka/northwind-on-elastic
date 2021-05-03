import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilterServiceService} from '../services/filter-service.service';
import {ElasticsearchService} from '../services/elasticsearch.service';
import Product from '../models/product';
import {PageBase} from '../common/PageBase';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-fulltext-results',
  templateUrl: './fulltext-results.page.html',
  styleUrls: ['./fulltext-results.page.scss'],
})
export class FulltextResultsPage extends PageBase implements OnInit, OnDestroy {
  public products: Product[] = [];

  constructor(
    protected filterService: FilterServiceService,
    private elasticsearchService: ElasticsearchService,
    protected alertController: AlertController) {
    super(filterService, alertController);
  }

  loadData(value: string){
    this.elasticsearchService.getFullTextSearchResults(value).subscribe(results => {
      this.products = results;
    }, async error => {
      console.log(error);
      await this.showMessage('Error', 'Receving results failed. Check console for details');
    });
  }
}
