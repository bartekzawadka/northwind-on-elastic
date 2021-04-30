import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-autocomplete-popover',
  templateUrl: './search-autocomplete-popover.component.html',
  styleUrls: ['./search-autocomplete-popover.component.scss'],
})
export class SearchAutocompletePopoverComponent implements OnInit {

  @Input() value: string;
  constructor() { }

  ngOnInit() {
    console.log(this.value);
  }

}
