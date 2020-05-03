import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { NewsResolver } from './services/news-resolver.service';

import { LoginComponent } from './components/login/login.component';
import { NewsComponent } from './components/news/news.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'news',
    canActivate: [AuthGuard],
    component: NewsComponent,
    resolve: {
      news: NewsResolver
    }
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent
  }
];



@NgModule({
  imports: [
      RouterModule.forRoot(
          appRoutes
      ),
      CommonModule
  ],
  exports: [
      RouterModule
  ],
  providers: [
      NewsResolver
  ]
})


export class AppRoutingModule { }




