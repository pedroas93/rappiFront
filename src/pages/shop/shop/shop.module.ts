import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageShop } from './shop';
import { ComponentShopFormModule } from '../../../components/shop/shop.module';
import { ComponentSharedGridModule } from 'components/shared/grid/grid.module';

const routes: Routes = [
  { path: '', component: PageShop }
];

@NgModule({
  declarations: [
    PageShop,
  ],
  imports: [
    ComponentSharedGridModule,
    ComponentShopFormModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    PageShop
  ]
})
export class PageShopFormModule {}
