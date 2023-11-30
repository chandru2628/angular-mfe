import { Component } from '@angular/core';
import { GridOptions } from "ag-grid-community";

@Component({
  selector: 'app-remotes',
  templateUrl: './remotes.component.html',
  styleUrls: ['./remotes.component.css']
})
export class RemotesComponent {
  gridOptions: GridOptions;
  params: any;
  rowData:any=[];
  columnDefs:any=[];
  rowSelection: 'single' | 'multiple' = 'multiple';
  isOnline: boolean = true;
  
  constructor() {
    this.gridOptions = <GridOptions>{
      enableSorting: true,
      // enable filtering 
      enableFilter: true
    };
    this.columnDefs = [
      {
        headerName: "ID",
        field: "id",
        width: 180
      },
      {
        headerName: "Name",
        field: "name",
        width: 250,
        editable:true
      },
      {
        headerName: "Age",
        field: "age",
        width: 200,
        editable:true
      },
      {
        headerName: "Gender",
        field: "gender",
        width: 200,
        editable:true
      },
      {
        headerName: "Department",
        field: "department",
        width: 250,
        editable:true
      },
      {
        headerName:"Location",
        field:"location",
        width:250,
        editable:true
      }

    ];

    this.rowData = [
      { id: 1, name:"Albert",age:27,gender:"Male",department:"Development",location:"United States" },
      { id: 2, name:"Brendon",age:25,gender:"Male",department:"Finance",location:"United Kingdom" },
      { id: 3, name:"Cherry",age:35,gender:"Male",department:"Admin",location:"United Arab Emirates" },
      { id: 4, name:"Daryll",age:28,gender:"Male",department:"HR",location:"United States"},
      { id: 5, name:"Edvert",age:26,gender:"Male",department:"Development",location:"United States" },
      { id: 6, name:"Franklin",age:22,gender:"Male",department:"Finance",location:"United Kingdom"},
      { id: 7, name:"Green",age:32,gender:"Male",department:"Admin",location:"United Arab Emirates" },
      { id: 8, name:"Henry",age:29,gender:"Male",department:"HR" ,location:"United States"},
      { id: 9, name:"Irvine",age:33,gender:"Male",department:"Development" ,location:"United States"},
      { id: 10, name:"John",age:30,gender:"Male",department:"Finance",location:"United Kingdom" },
      { id: 11, name:"Kennedy",age:58,gender:"Male",department:"CEO",location:"United States" }
    ]
  }

  ngOnInit() {
    // Check online/offline status when the component is initialized
    this.checkOnlineStatus();

    // Listen for changes in online/offline status
    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());
  }

  private checkOnlineStatus() {
    this.isOnline = navigator.onLine;
  }

  private updateOnlineStatus() {
    this.checkOnlineStatus();
  }
  // agInit(params: any): void {
  //   this.params = params;
  // }
   // Method to add a new row
   addNewRow() {
    // Create a new row object
    const newRow = {
      // Set your column values for the new row
      // For example:
      id: this.rowData.length + 1,
      name: '',
      age:0,
      gender:"",
      department:"",
      location:""
      // Add other columns as needed
    };

    // Add the new row to the data source
    this.rowData = [...this.rowData, newRow];

    // Refresh the grid
    this.gridOptions.api?.setRowData(this.rowData);
    alert("New Row added");
  }

  // Method to save edited row
  onCellEditingStopped(event: any) {
    // event.data contains the edited row
    // You can perform any necessary updates or save data to the backend here
    console.log('Row updated:', event.data);
    alert("Data updated");
  }

  deleteSelectedRow() {
    let selectedRows:any=[];
    selectedRows=this.gridOptions.api?.getSelectedRows();

    if (selectedRows?.length > 0) {
      const selectedRowId = selectedRows[0].id; // Assuming 'id' is your unique identifier
      this.rowData = this.rowData.filter((row:any) => row.id !== selectedRowId);
      this.gridOptions.api?.setRowData(this.rowData);
      alert("Selected data removed");
    } else {
      console.log('No row selected for deletion.');
      alert("No row selected for deletion.");
    }
  }
}