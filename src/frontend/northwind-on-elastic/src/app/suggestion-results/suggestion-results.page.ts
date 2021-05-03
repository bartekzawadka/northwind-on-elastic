import {Component} from '@angular/core';
import {FilterServiceService} from '../services/filter-service.service';
import {ElasticsearchService} from '../services/elasticsearch.service';
import Product from '../models/product';
import {PageBase} from '../common/page-base';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-suggestion-results',
  templateUrl: './suggestion-results.page.html',
  styleUrls: ['./suggestion-results.page.scss'],
})
export class SuggestionResultsPage extends PageBase {
  products: Product[];

  constructor(
    protected filterService: FilterServiceService,
    protected alertController: AlertController,
    private elasticSearchService: ElasticsearchService) {
    super(filterService, alertController);
  }

  loadData(value: string){
    this.elasticSearchService.getSuggestions(value)
      .subscribe(results => {
        this.products = results;
      });
  }
}
