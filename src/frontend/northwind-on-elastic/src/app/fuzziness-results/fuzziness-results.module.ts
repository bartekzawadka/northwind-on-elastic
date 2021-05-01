import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuzzinessResultsPageRoutingModule } from './fuzziness-results-routing.module';

import { FuzzinessResultsPage } from './fuzziness-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FuzzinessResultsPageRoutingModule
  ],
  declarations: [FuzzinessResultsPage]
})
export class FuzzinessResultsPageModule {}
