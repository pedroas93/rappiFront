import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageUserLogin } from './login';

const routes: Routes = [
  { path: '', component: PageUserLogin }
];

@NgModule({
  declarations: [
    PageUserLogin,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes),
  ],
  exports: [
    PageUserLogin
  ]
})
export class PageUserLoginModule {}
