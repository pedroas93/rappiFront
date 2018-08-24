import {
  AlertService,
  AuthService,
  CategoriesDta,
  CategoriesService,
  ShopDta,
  ShopService,
  SubLevelsDta,
  SubLevelsService,
  Loading,
  // SecurityGuard,
  UserDta,
  UserService
} from './providers.index';

import { NgModule } from '@angular/core';
import { environment } from 'environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { MatSnackBarModule, MatDialogModule } from '@angular/material';

@NgModule({
 imports: [
    MatSnackBarModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
 ],
 providers: [
  AlertService,
  AuthService,
  CategoriesDta,
  CategoriesService,
  ShopDta,
  ShopService,
  SubLevelsDta,
  SubLevelsService,
  Loading,
  // SecurityGuard,
  UserDta,
  UserService,
  ]
})
export class ProvidersModule {}
