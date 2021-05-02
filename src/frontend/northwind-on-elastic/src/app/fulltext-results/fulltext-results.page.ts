import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilterServiceService} from '../services/filter-service.service';
import {Subscription} from 'rxjs';
import {ElasticsearchService} from '../services/elasticsearch.service';

@Component({
  selector: 'app-fulltext-results',
  templateUrl: './fulltext-results.page.html',
  styleUrls: ['./fulltext-results.page.scss'],
})
export class FulltextResultsPage implements OnInit, OnDestroy {
  private filterChangeSubscription: Subscription;

  constructor(private filterService: FilterServiceService, private elasticsearchService: ElasticsearchService) { }

  ngOnInit() {
    this.filterChangeSubscription = this.filterService.filterChanged.subscribe(value => this.onFilterChanged(value));
  }

  ngOnDestroy(){
    this.filterChangeSubscription.unsubscribe();
  }

  private onFilterChanged(value: string){
    this.elasticsearchService.getFullTextSearchResults(value).subscribe(value1 => {
      console.log(value1);
    }, error => {
      console.log(error);
    });
  }
}
