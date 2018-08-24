import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentLayoutsBack } from './back';
import { ComponentLangMenuModule } from '../../shared/langMenu/langMenu.module';
import { ComponentLayoutsLoadingModule } from '../loading/loading.module';
// import { SignOutModule } from '../../user/signOut/signOut.module';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatMenuModule, MatSidenavModule, MatToolbarModule, MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ComponentLayoutsBack,
  ],
  imports: [
    MatIconModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    CommonModule,
    ComponentLayoutsLoadingModule,
    ComponentLangMenuModule,
    TranslateModule.forChild(),
    RouterModule,
  ],
  exports: [
    ComponentLayoutsBack,
  ]
})
export class ComponentLayoutsBackModule {}
