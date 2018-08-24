import { NgModule } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ComponentLayoutsFront } from './front';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ComponentLayoutsFront,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
  ],
  exports: [
    ComponentLayoutsFront,
  ]
})
export class ComponentLayoutsFrontModule {}
