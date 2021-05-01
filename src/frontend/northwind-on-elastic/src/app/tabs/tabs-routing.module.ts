import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/suggestions',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'suggestions',
        loadChildren: () => import('../suggestion-results/suggestion-results.module').then(m => m.SuggestionResultsPageModule)
      },
      {
        path: 'fulltext',
        loadChildren: () => import('../fulltext-results/fulltext-results.module').then( m => m.FulltextResultsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/suggestions',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
