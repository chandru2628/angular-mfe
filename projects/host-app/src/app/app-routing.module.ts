import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'employees',
    // loadChildren:()=>import('remoteApp/Module').then(m=>m.RemotesModule)
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:5200/remoteEntry.js',
      exposedModule: './Module'
    })
      .then(m => m.RemotesModule)
  },
  {
    path: 'adduser',
    // loadChildren:()=>import('remoteApp/Module').then(m=>m.RemotesModule)
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:5201/remoteEntry.js',
      exposedModule: './Module'
    })
      .then(m => m.HomeModule)
  },
  {
    path: 'edituser',
    // loadChildren:()=>import('remoteApp/Module').then(m=>m.RemotesModule)
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:5201/remoteEntry.js',
      exposedModule: './Module'
    })
      .then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
