import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuggestionResultsPage } from './suggestion-results.page';

const routes: Routes = [
  {
    path: '',
    component: SuggestionResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuggestionResultsPageRoutingModule {}
