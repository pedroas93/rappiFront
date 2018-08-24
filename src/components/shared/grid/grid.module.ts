import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import { ComponentSharedGrid } from './grid';
import { MatPaginatorModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { SortablejsModule } from 'angular-sortablejs/dist';
import { MatProgressSpinnerModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    ComponentSharedGrid,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SortablejsModule,
    TranslateModule.forChild(),
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    ComponentSharedGrid,
  ]
})


export class ComponentSharedGridModule {}
