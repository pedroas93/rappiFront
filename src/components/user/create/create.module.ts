import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentUserCreate } from './create';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    ComponentUserCreate,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
  exports: [
    ComponentUserCreate,
  ]
})
export class ComponentUserCreateModule {}
