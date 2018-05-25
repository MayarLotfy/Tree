import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { StoreModule } from './store/store.module';
import { infoModule } from './info/info.module';

import { ThemeModule } from '../@theme/theme.module';
import { PagesRoutingModule } from './pages-routing.module';



const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    
    ThemeModule,
    StoreModule,
   
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
