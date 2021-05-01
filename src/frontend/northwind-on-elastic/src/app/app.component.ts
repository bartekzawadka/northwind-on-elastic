import { Component } from '@angular/core';
import {FilterServiceService} from './services/filter-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private filterService: FilterServiceService) {}

  searchBarOnChange(value: string){
    this.filterService.setCurrentFilterValue(value);
  }
}
