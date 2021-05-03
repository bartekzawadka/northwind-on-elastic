import { Component } from '@angular/core';
import {FilterServiceService} from './services/filter-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  searchbarValue = '';
  constructor(private filterService: FilterServiceService) {}

  searchBarOnChange(value: string){
    this.searchbarValue = value;
    this.filterService.setCurrentFilterValue(value);
  }

  onEnter() {
    this.filterService.setCurrentFilterValue(this.searchbarValue);
  }
}
