import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FulltextResultsPageRoutingModule } from './fulltext-results-routing.module';

import { FulltextResultsPage } from './fulltext-results.page';
import {ProductsListComponent} from '../common/products-list/products-list.component';
import {ProductsListElementComponent} from '../common/products-list-element/products-list-element.component';
import {NoResultsComponentComponent} from '../common/no-results-component/no-results-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FulltextResultsPageRoutingModule
  ],
  exports: [
    NoResultsComponentComponent
  ],
  declarations: [
    FulltextResultsPage,
    NoResultsComponentComponent,
    ProductsListComponent,
    ProductsListElementComponent
  ]
})
export class FulltextResultsPageModule {}
