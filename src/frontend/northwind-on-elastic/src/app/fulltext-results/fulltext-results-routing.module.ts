import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FulltextResultsPage } from './fulltext-results.page';

const routes: Routes = [
  {
    path: '',
    component: FulltextResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FulltextResultsPageRoutingModule {}
