import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import Product from '../../models/product';
import {PagedResult} from '../../models/paged-result';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  @Input() pageData: PagedResult<Product> = new PagedResult<Product>();
  @Input() title = '';

  @Output() onLoadMore = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onLoadMoreClick() {
    this.onLoadMore.emit();
  }
}
