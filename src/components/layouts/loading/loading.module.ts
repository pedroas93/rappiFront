import { NgModule } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

import { CommonModule } from '@angular/common';
import { ComponentLayoutsLoading } from './loading';
import { MatProgressSpinnerModule } from '@angular/material';


@NgModule({
  declarations: [
    ComponentLayoutsLoading,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    TranslateModule.forChild(),
  ],
  exports: [
    ComponentLayoutsLoading,
  ]
})
export class ComponentLayoutsLoadingModule {}
