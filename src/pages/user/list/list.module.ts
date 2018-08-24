import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PageUserList } from './list';

const routes: Routes = [
  { path: '', component: PageUserList }
];

@NgModule({
  declarations: [
    PageUserList,
  ],
  imports: [
    TranslateModule.forChild(),
    RouterModule.forChild(routes),
  ],
  exports: [
    PageUserList
  ]
})
export class PageUserListModule {}
