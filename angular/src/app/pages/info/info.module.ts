import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { infoComponent } from './info.component';
import { ThemeModule } from '../../@theme/theme.module';
import { BrowserModule } from '@angular/platform-browser';
import { infoRoutingModule } from './info-routing.module';

@NgModule({
  imports: [FormsModule , ThemeModule , infoRoutingModule],
  declarations: [infoComponent],
  entryComponents: [],
  providers: []
})

export class infoModule {}
