import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ContactDetailPageComponent } from './pages/contact-detail-page/contact-detail-page.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RandomContactPageComponent } from './pages/random-contact-page/random-contact-page.component';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { OnDemandPreloadStrategy } from './routes/preloading-strategies/on-demand-preloading-strategy';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomePageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'contacts',
        component: ContactsPageComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'contacts/:id',
        component: ContactDetailPageComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'random',
        component: RandomContactPageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'tasks',
        component: TasksPageComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'fire-store',
        loadChildren: () => import('./modules/pages/fire-store/fire-store.module').then(m => m.FireStoreModule),
        canActivate: [ AuthGuard ],
        data: {
          preload: true
        }
      },
    ]
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: OnDemandPreloadStrategy
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
