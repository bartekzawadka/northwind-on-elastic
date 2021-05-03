import {Component, Input, OnInit} from '@angular/core';
import Product from '../../models/product';

@Component({
  selector: 'app-products-list-element',
  templateUrl: './products-list-element.component.html',
  styleUrls: ['./products-list-element.component.scss'],
})
export class ProductsListElementComponent implements OnInit {
  @Input() product: Product;
  constructor() { }

  ngOnInit() {}

}
