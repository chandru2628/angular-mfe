import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemotesRoutingModule } from './remotes-routing.module';
import { RemotesComponent } from './remotes.component';
import {AgGridModule} from "ag-grid-angular";

@NgModule({
  declarations: [
    RemotesComponent
  ],
  imports: [
    CommonModule,
    RemotesRoutingModule,
    AgGridModule
  ]
})
export class RemotesModule { }
