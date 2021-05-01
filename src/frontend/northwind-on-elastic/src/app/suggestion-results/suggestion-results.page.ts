import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FilterServiceService} from '../services/filter-service.service';
import {ElasticsearchService} from '../services/elasticsearch.service';
import Product from '../models/product';

@Component({
  selector: 'app-suggestion-results',
  templateUrl: './suggestion-results.page.html',
  styleUrls: ['./suggestion-results.page.scss'],
})
export class SuggestionResultsPage implements OnInit, OnDestroy {
  products: Product[];
  private filterChangeSubscription: Subscription;

  constructor(
    private filterService: FilterServiceService,
    private elasticSearchService: ElasticsearchService) { }

  ngOnInit() {
    this.filterChangeSubscription =
    this
      .filterService
      .filterChanged
      .subscribe((value) => this.getSuggestions(value));
  }

  ngOnDestroy(){
    this.filterChangeSubscription.unsubscribe();
  }

  private getSuggestions(value: string){
    this.elasticSearchService.getSuggestions(value)
      .subscribe(results => {
        this.products = results;
      });
  }
}
