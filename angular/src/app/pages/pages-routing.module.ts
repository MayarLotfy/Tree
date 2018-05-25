import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';

import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './tree/tree.component';



const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'tree',
    component: StoreComponent,
  },
  
  {
    path: '',
    redirectTo: 'tree',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
