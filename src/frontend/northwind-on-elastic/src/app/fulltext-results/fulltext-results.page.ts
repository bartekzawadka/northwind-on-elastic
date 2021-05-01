import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilterServiceService} from '../services/filter-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-fulltext-results',
  templateUrl: './fulltext-results.page.html',
  styleUrls: ['./fulltext-results.page.scss'],
})
export class FulltextResultsPage implements OnInit, OnDestroy {
  private filterChangeSubscription: Subscription;

  constructor(private filterService: FilterServiceService) { }

  ngOnInit() {
    //this.filterChangeSubscription = this.filterService.filter.subscribe(this.onFilterChanged);
  }

  ngOnDestroy(){
    //this.filterChangeSubscription.unsubscribe();
  }

  private onFilterChanged(value: string){
    console.log(`FULLTEXT: ${value}`);
  }
}
