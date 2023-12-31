import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'employees',
    loadChildren: () => import('./remotes/remotes.module').then(m => m.RemotesModule)
  },
  {
    path:'adduser',
    loadChildren:()=>import('projects/remote-app-2/src/app/home/home.module').then(m=>m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
