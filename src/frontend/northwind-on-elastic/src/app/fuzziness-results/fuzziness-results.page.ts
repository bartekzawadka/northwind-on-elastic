import { Component } from '@angular/core';
import Product from '../models/product';
import {PageBase} from '../common/page-base';
import {AlertController} from '@ionic/angular';
import {FilterServiceService} from '../services/filter-service.service';
import {ElasticsearchService} from '../services/elasticsearch.service';

@Component({
  selector: 'app-fuzziness-results',
  templateUrl: './fuzziness-results.page.html',
  styleUrls: ['./fuzziness-results.page.scss'],
})
export class FuzzinessResultsPage extends PageBase {
  products: Product[] = [];
  constructor(
    protected alertController: AlertController,
    protected filterService: FilterServiceService,
    private elasticsearchService: ElasticsearchService) {
    super(filterService, alertController);
  }

  loadData(filterValue: string) {
    this.elasticsearchService.getFullTextSearchResults(filterValue, 'AUTO').subscribe(results => {
      this.products = results;
    }, async error => {
      console.log(error);
      await this.showMessage('Error', 'Receving results failed. Check console for details');
    });
  }

}
