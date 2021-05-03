import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import Product from '../../models/product';
import {PagedResult} from '../../models/paged-result';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  private _pageData: PagedResult<Product> = new PagedResult<Product>();
  private currentLoaderTarget: any = undefined;

  get pageData(): PagedResult<Product>{
    return this._pageData;
  }

  @Input() set pageData(value: PagedResult<Product>){
    this._pageData = value;
    if(this.currentLoaderTarget){
      this.currentLoaderTarget.complete();
    }
  }
  @Input() title = '';

  @Output() onLoadMore = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  loadData(event) {
    this.currentLoaderTarget = event.target;
    if(this.pageData.data.length === this.pageData.total){
      event.target.disabled = true;
    }else{
      this.onLoadMore.emit();
    }
  }
}
