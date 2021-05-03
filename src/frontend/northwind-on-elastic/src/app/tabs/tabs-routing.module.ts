import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/all-products',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'all-products',
        loadChildren: () => import('../all-products-list/all-products-list.module').then(m => m.AllProductsListPageModule)
      },
      {
        path: 'suggestions',
        loadChildren: () => import('../suggestion-results/suggestion-results.module').then(m => m.SuggestionResultsPageModule)
      },
      {
        path: 'fulltext',
        loadChildren: () => import('../fulltext-results/fulltext-results.module').then( m => m.FulltextResultsPageModule)
      },
      {
        path: 'fuzziness',
        loadChildren: () => import('../fuzziness-results/fuzziness-results.module').then( m => m.FuzzinessResultsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/all-products',
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
