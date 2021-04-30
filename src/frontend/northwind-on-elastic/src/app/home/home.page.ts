import { Component } from '@angular/core';
import { DataService, Message } from '../services/data.service';
import {ElasticsearchService} from "../services/elasticsearch.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  showAutocomplete = false;
  dd = [
    {
      name: 'One',
      value: '1'
    },
    {
      name: 'Two',
      value: '2'
    }
  ];

  constructor(private data: DataService, private elasticService: ElasticsearchService) {}

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  async searchBarOnChange(value: string) {
    this.showAutocomplete = !!value;
    this.elasticService.getSuggestions(value).subscribe(value1 => console.log(value1), error => console.log(error));
  }
}
