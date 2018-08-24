import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentShop } from './shop';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ComponentShop,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ],
  exports: [
    ComponentShop,
  ]
})
export class ComponentShopFormModule {}
