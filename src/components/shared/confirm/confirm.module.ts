import { NgModule } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import { ComponentSharedConfirm } from './confirm';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';


@NgModule({
  declarations: [
    ComponentSharedConfirm,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MatDialogModule
  ],
  exports: [
    ComponentSharedConfirm,
  ],
  entryComponents: [
    ComponentSharedConfirm
  ]
})
export class ComponentSharedConfirmModule {}
