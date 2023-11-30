import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemotesComponent } from './remotes.component';

const routes: Routes = [{ path: '', component: RemotesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemotesRoutingModule { }
