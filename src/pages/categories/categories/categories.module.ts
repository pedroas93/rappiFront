import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageCategories } from './categories';
// import { ComponentInterviewFormModule } from '../../../components/interview/form/form.module';
import { ComponentSharedGridModule } from 'components/shared/grid/grid.module';

const routes: Routes = [
  { path: '', component: PageCategories }
];

@NgModule({
  declarations: [
    PageCategories,
  ],
  imports: [
    ComponentSharedGridModule,
    // ComponentInterviewFormModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    PageCategories
  ]
})
export class PageCategoriesFormModule {}
