import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageSubLevels } from './subLevels';
import { StorageServiceModule} from 'angular-webstorage-service';
// import { ComponentInterviewFormModule } from '../../../components/interview/form/form.module';
import { ComponentSharedGridModule } from 'components/shared/grid/grid.module';

const routes: Routes = [
  { path: '', component: PageSubLevels }
];

@NgModule({
  declarations: [
    PageSubLevels,
  ],
  imports: [
    StorageServiceModule,
    ComponentSharedGridModule,
    // ComponentInterviewFormModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    PageSubLevels
  ]
})
export class PageSubLevelsFormModule {}
