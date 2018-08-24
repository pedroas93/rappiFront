import { ProvidersModule } from 'providers/providers.module';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentLayoutsBackModule } from 'components/layouts/back/back.module';
import { ComponentLayoutsFrontModule } from 'components/layouts/front/front.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ComponentSharedConfirmModule } from 'components/shared/confirm/confirm.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule,
    ComponentLayoutsBackModule,
    ComponentLayoutsFrontModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ProvidersModule,
    AppRoutingModule,
    ComponentSharedConfirmModule,
    // ComponentBlogPreviewContentModule,
    // ComponentDialogModule,
    // ComponentDialogPreviewFileModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }
