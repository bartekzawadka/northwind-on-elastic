import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuzzinessResultsPageRoutingModule } from './fuzziness-results-routing.module';

import { FuzzinessResultsPage } from './fuzziness-results.page';
import {NoResultsComponentComponent} from '../common/no-results-component/no-results-component.component';
import {ProductsListComponent} from '../common/products-list/products-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FuzzinessResultsPageRoutingModule,
  ],
  declarations: [
    FuzzinessResultsPage,
    NoResultsComponentComponent,
    ProductsListComponent
  ]
})
export class FuzzinessResultsPageModule {}
