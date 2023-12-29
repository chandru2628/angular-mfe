import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent, merge, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-remotes',
  templateUrl: './remotes.component.html',
  styleUrls: ['./remotes.component.css']
})

export class RemotesComponent implements OnInit,OnDestroy{
  gridOptions: GridOptions;
  params: any;
  rowData:any=[];
  columnDefs:any=[];
  rowSelection: 'single' | 'multiple' = 'single';
  isOnline: boolean=false;
  networkStatus$: Subscription = Subscription.EMPTY;
  constructor(private commonService:CommonService,private router:Router, private spinner:NgxSpinnerService) {
    this.gridOptions = <GridOptions>{
      enableSorting: true,
      // enable filtering 
      enableFilter: true,
      rowSelection: 'single'
    };
    this.columnDefs = [
      {
        headerName: "ID",
        field: "id",
        width: 100
      },
      {
        headerName: "First Name",
        field: "firstName",
        width: 180
      },
      {
        headerName: "Last Name",
        field: "lastName",
        width: 180 
      },
      {
        headerName: "Email",
        field: "email",
        width: 180 
      },
      {
        headerName: "Phone Number",
        field: "phoneNumber",
        width: 180  
      },
      {
        headerName: "Address 1",
        field: "address1",
        width: 100
      },
      {
        headerName: "Address 2",
        field: "address2",
        width: 100
      },
      {
        headerName: "City",
        field: "city",
        width: 100
      },
      {
        headerName: "State",
        field: "state",
        width: 100,
      },
      {
        headerName: "Zipcode",
        field: "zipCode",
        width: 100 
      },
      {
        headerName:"Country",
        field:"country",
        width:100
      },
      {
        headerName:"Qualification",
        field:"qualification",
        width:150
      },
      {
        headerName:"Comments",
        field:"comments",
        width:150
      }

    ];
  }

  ngOnInit() {
    // Check online/offline status when the component is initialized
    this.checkOnlineStatus();
    this.getUsers();
  }

  private getUsers() {
    this.spinner.show();
    if (this.isOnline) {
      this.commonService.get('users').subscribe({
        next: (data: any) => {
          this.rowData = data;
          localStorage.setItem('existingData', JSON.stringify(this.rowData));
          this.spinner.hide();
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
          // this.toaster.showFailToaster(err.error.text, 'Error');
        }
      })
    } else {
      this.rowData=[];
      if (localStorage.getItem('existingData')) {
        this.rowData = this.rowData.concat(this.commonService.getDataFromLocalStorage('existingData'));
      }
      if (this.commonService.getDataFromLocalStorage('addingData')) {
        this.rowData = this.rowData.concat(this.commonService.getDataFromLocalStorage('addingData'));
      }
      this.spinner.hide();
    }
  }

  private checkOnlineStatus() {
    this.isOnline = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        console.log('status', status);
        this.isOnline = status;
      });
      if (this.isOnline) {
        this.syncData();
      }
  }

  private syncData() {
    let addData = this.commonService.getDataFromLocalStorage('addingData');
    let updateData = this.commonService.getDataFromLocalStorage('updatingData');
    let removeData = this.commonService.getDataFromLocalStorage('deletingData');

    addData = addData.length==0?[]:[addData];
    updateData = updateData.length==0?[]:[updateData];
    removeData =removeData.length==0?[]:[removeData];
    if (addData&&addData.length>0) {
      for (let data of addData) {
        this.spinner.show();
        this.commonService.createUser(data).subscribe((result: any) => {
          if (result) {
            this.spinner.hide();
            this.getUsers();
          }
        });
      }
      alert("User(s) created successfully");
      this.commonService.removeDataFromLocalStorage('addingData');
    }
    if (updateData&&updateData.length>0) {
      for (let data of updateData) {
        this.spinner.show();
        this.commonService.updateUser(data.id, data).subscribe((result: any) => {
          if (result) {
            this.spinner.hide();
            this.router.navigate(['/employees']);
          }
        });
      }
      alert("User(s) record updated successfully");
      this.commonService.removeDataFromLocalStorage('updatingData');
    }

    if (removeData&&removeData.length>0) {
      for (let data of removeData) {
        this.spinner.show();
        this.commonService.delete('users', data.id).subscribe((result: any) => {
          if (result == null) {
            this.spinner.hide();
            this.getUsers();
          }
        });
      }
      alert("User(s) record deleted successfully");
      this.commonService.removeDataFromLocalStorage('deletingData');
    }
  }
   // Method to add a new row
   addNewRow() {
    localStorage.removeItem('editUser');
    this.router.navigate(['/adduser']);
  }

  editSelectedRow(){
    let selectedRows:any=[];
    selectedRows=this.gridOptions.api?.getSelectedRows();
    if (selectedRows?.length > 0) {
      localStorage.setItem('editUser',JSON.stringify(selectedRows[0]));
      this.router.navigate(['/edituser'])
    } else {
      console.log('No row selected for edit.');
      alert("No row selected for edit.");
    }
  }

  deleteSelectedRow() {
    let selectedRows:any=[];
    selectedRows=this.gridOptions.api?.getSelectedRows();
    if (selectedRows?.length > 0) {
      if (confirm("Do you want to delete this record?")== true) {
        if(this.isOnline){
          this.spinner.show();
          this.commonService.delete('users',selectedRows[0].id).subscribe((result: any) => {
            if (result==null) {
              alert("User record deleted successfully");
              this.getUsers();
              this.spinner.hide();
            }
          });
        }else{
          const offlineData = this.commonService.getDataFromLocalStorage('existingData');
          const updatedData = offlineData.filter((item:any) => item.id !== selectedRows[0].id);
          const deleteData=offlineData.filter((item:any)=>item.id === selectedRows[0].id);
          this.commonService.saveDataToLocalStorage('existingData',updatedData);
          this.commonService.saveDataToLocalStorage('deletingData',deleteData);
          this.getUsers();
        }
      } else {
        
      }
    } else {
      console.log('No row selected for deletion.');
      alert("No row selected for deletion.");
    }
  }

  ngOnDestroy(){
    this.networkStatus$.unsubscribe();
  }
}