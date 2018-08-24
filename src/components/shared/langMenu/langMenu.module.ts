import { NgModule } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import { ComponentLangMenu } from './langMenu';
import { MatMenuModule } from '@angular/material';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    ComponentLangMenu,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MatMenuModule,
  ],
  exports: [
    ComponentLangMenu,
  ]
})
export class ComponentLangMenuModule {}
