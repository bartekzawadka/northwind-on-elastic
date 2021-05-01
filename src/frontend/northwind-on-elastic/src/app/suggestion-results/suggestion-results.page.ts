import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FilterServiceService} from '../services/filter-service.service';
import {ElasticsearchService} from '../services/elasticsearch.service';
import Product from "../models/product";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-suggestion-results',
  templateUrl: './suggestion-results.page.html',
  styleUrls: ['./suggestion-results.page.scss'],
})
export class SuggestionResultsPage implements OnInit, OnDestroy {
  products: Product[];
  //private filterChangeSubscription: Subscription;
  private filterValue = '';

  constructor(
    private filterService: FilterServiceService,
    private elasticSearchService: ElasticsearchService) { }

  ngOnInit() {
    this
      .filterService
      .filter
      .pipe(tap(data => this.onFilterChanged()));
      //.subscribe(() => this.onFilterChanged());
  }

  ngOnDestroy(){
    //this.filterChangeSubscription.unsubscribe();
  }

  private onFilterChanged(){
    this.filterValue = this.filterService.getCurrentFilterValue();
    this.getSuggestions();
  }

  private getSuggestions(){
    this.elasticSearchService.getSuggestions(this.filterValue)
      .subscribe(results => {
        console.log(results);
        this.products = results;
      });
  }
}
