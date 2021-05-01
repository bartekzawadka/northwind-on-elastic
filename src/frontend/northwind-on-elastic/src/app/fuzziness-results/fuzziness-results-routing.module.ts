import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuzzinessResultsPage } from './fuzziness-results.page';

const routes: Routes = [
  {
    path: '',
    component: FuzzinessResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuzzinessResultsPageRoutingModule {}
