import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FulltextResultsPageRoutingModule } from './fulltext-results-routing.module';

import { FulltextResultsPage } from './fulltext-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FulltextResultsPageRoutingModule
  ],
  declarations: [FulltextResultsPage]
})
export class FulltextResultsPageModule {}
