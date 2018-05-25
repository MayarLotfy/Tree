import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { infoComponent } from '../info/info.component';

const routes: Routes = [
  {
    path: '',
    component: infoComponent,
    children: [
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class infoRoutingModule {}
