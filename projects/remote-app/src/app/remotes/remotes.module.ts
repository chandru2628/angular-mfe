import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemotesRoutingModule } from './remotes-routing.module';
import { RemotesComponent } from './remotes.component';
import {AgGridModule} from "ag-grid-angular";
import { CommonService } from '../services/common.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    RemotesComponent
  ],
  imports: [
    CommonModule,
    RemotesRoutingModule,
    AgGridModule,
    HttpClientModule
  ],
  providers: [CommonService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class RemotesModule { }
