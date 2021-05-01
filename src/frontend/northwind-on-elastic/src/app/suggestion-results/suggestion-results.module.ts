import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggestionResultsPageRoutingModule } from './suggestion-results-routing.module';

import { SuggestionResultsPage } from './suggestion-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuggestionResultsPageRoutingModule
  ],
  declarations: [SuggestionResultsPage]
})
export class SuggestionResultsPageModule {}
