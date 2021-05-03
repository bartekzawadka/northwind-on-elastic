import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggestionResultsPageRoutingModule } from './suggestion-results-routing.module';

import { SuggestionResultsPage } from './suggestion-results.page';
import {NoResultsComponentComponent} from '../common/no-results-component/no-results-component.component';
import {ProductsListComponent} from '../common/products-list/products-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
      SuggestionResultsPageRoutingModule
    ],
  declarations: [
    SuggestionResultsPage,
    NoResultsComponentComponent,
    ProductsListComponent]
})
export class SuggestionResultsPageModule {}
