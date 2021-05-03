import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllProductsListPageRoutingModule } from './all-products-list-routing.module';

import { AllProductsListPage } from './all-products-list.page';
import {NoResultsComponentComponent} from '../common/no-results-component/no-results-component.component';
import {ProductsListComponent} from '../common/products-list/products-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllProductsListPageRoutingModule
  ],
  declarations: [
    AllProductsListPage,
    NoResultsComponentComponent,
    ProductsListComponent
  ]
})
export class AllProductsListPageModule {}
