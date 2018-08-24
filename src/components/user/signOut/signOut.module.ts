import { NgModule } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

import { CommonModule } from '@angular/common';
import { SignOut } from './signOut';
import { MatIconModule } from '@angular/material';


@NgModule({
  declarations: [
    SignOut,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule.forChild(),
  ],
  exports: [
    SignOut,
  ]
})
export class SignOutModule {}
