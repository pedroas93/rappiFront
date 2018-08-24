import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentLayoutsBack } from 'components/layouts/back/back';
// import { SecurityGuard } from 'providers/providers.index';
import { ComponentLayoutsFront } from 'components/layouts/front/front';


const FRONTROUTES2: Routes = [
    // {
    //   path: 'users/login',
    //   loadChildren: 'pages/user/list/list.module#PageUserListModule',
    // }
    // ,
    // {
    //   path: 'users/rememberPassword',
    //   loadChildren: 'pages/user/rememberPassword/rememberPassword.module#PageUserRememberPasswordModule',
    // },
];
const BACKROUTES: Routes = [
    {
      path: 'users/list',
      loadChildren: 'pages/user/list/list.module#PageUserListModule',
    },
    {
      path: 'categories',
      loadChildren: 'pages/categories/categories/categories.module#PageCategoriesFormModule',
      // canActivate: [SecurityGuard],
    //   data: {
    //     expectedRole: ['admin', 'professional']
    // }

    },
    {
      path: 'shop',
      loadChildren: 'pages/shop/shop/shop.module#PageShopFormModule',
      // canActivate: [SecurityGuard],
    //   data: {
    //     expectedRole: ['admin', 'professional']
    // }

    },
    {
      path: 'categories/:idInterview',
      loadChildren: 'pages/subLevels/subLevels/subLevels.module#PageSubLevelsFormModule',
       // canActivate: [SecurityGuard],
    //   data: {
    //     expectedRole: ['admin', 'professional']
    // }

    },
    {
      path: 'list/categories/:idInterview',
      loadChildren: 'pages/subLevels2/subLevels/subLevels.module#PageSubLevelsFormModule2',
       // canActivate: [SecurityGuard],
    //   data: {
    //     expectedRole: ['admin', 'professional']
    // }

    },
    // {
    //   path: 'blog/category',
    //   loadChildren: 'pages/blog/category/category.module#PageBlogCategoryModule',
    //   canActivate: [SecurityGuard],
    //   data: {
    //     expectedRole: ['admin', 'professional']
    //   }
    // },
];

const routes: Routes = [
    { path: '', redirectTo: 'users/list', pathMatch: 'full' },
    // { path: '', component: ComponentLayoutsFront, children: FRONTROUTES },
    { path: '', component: ComponentLayoutsBack, children: BACKROUTES },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule {}
