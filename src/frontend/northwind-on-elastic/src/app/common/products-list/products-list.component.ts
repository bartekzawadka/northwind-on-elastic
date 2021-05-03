import {Component, Input, OnInit} from '@angular/core';
import Product from '../../models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() title = '';
  constructor() { }

  ngOnInit() {}

}
