import {Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { fromEvent } from 'rxjs';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bioData: any = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    phoneNumber2: "",
    phoneNumber3: "",
    qualification: "",
    comments: "",
    city: "",
    state: "",
    address1: "",
    address2: "",
    zipCode: "",
    country: ""
  }
  users:any=[];
  bioDataForm:any= FormGroup;
  isOnline: boolean = true;
  constructor(private _httpService:HttpService,private router:Router,private spinner:NgxSpinnerService) {}

  ngOnInit(){
    this.checkOnlineStatus();
    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());
    if(localStorage.getItem('editUser')){
      let user:any=localStorage.getItem('editUser');
      localStorage.removeItem('editUser');
      this.editUser(JSON.parse(user));
    }
  }

  private checkOnlineStatus() {
    this.isOnline = navigator.onLine;
  }

  private updateOnlineStatus() {
    this.checkOnlineStatus();
  }

  public editUser(user:any):void
  {
    this.spinner.show();
    console.log("User Data",user);
    const newUser={...user};
    this.bioData=newUser;
    this.bioData.phoneNumber=user.phoneNumber.slice(0,3);
    this.bioData.phoneNumber2=user.phoneNumber.slice(3,6);
    this.bioData.phoneNumber3=user.phoneNumber.slice(6,10);
    this.spinner.hide();
  }

  public submitForm(formData:any):void
  {
    if (this.isOnline) {
      this.spinner.show();
      this._httpService.createUser(formData).subscribe((result: any) => {
        if (result) {
          alert("User created successfully");
          this.bioData = {};
          this.spinner.hide();
          this.router.navigate(['/employees']);
        }
      });
    } else {
      const updatedData = formData;
      this._httpService.saveDataToLocalStorage('addingData', updatedData);
      this.router.navigate(['/employees']);
    } 
  }

  public updateForm(formData:any):void
  {
    if (this.isOnline) {
      this.spinner.show();
      this._httpService.updateUser(formData.id, formData).subscribe((result: any) => {
        if (result) {
          alert("User record updated successfully");
          this.bioData = {};
          this.spinner.hide();
          this.router.navigate(['/employees']);
        }
      });
    } else {
      const offlineData = this._httpService.getDataFromLocalStorage('existingData');
      const index = offlineData.findIndex((item: any) => item.id === formData.id);
      if (index !== -1) {
        offlineData[index] = formData;
        this._httpService.saveDataToLocalStorage('existingData',offlineData);
        this._httpService.saveDataToLocalStorage('updatingData',offlineData[index]);
        this.router.navigate(['/employees']);
      }
    }
  }

  public resetForm() {
    localStorage.removeItem('editUser');
    this.bioData={};
  }

  public autoFocus(e:any,previousNode:any,currentNode:any,nextNode:any):void
  {
    var length=currentNode.value.length;
    var maxLength=currentNode.getAttribute('maxlength');
    if(length==maxLength)
    {
      if(nextNode!="")
      {
        nextNode.focus();
      }
    }
    if(e.key==='Backspace')
    {
      if(previousNode!=""&&length==0)
      {
        previousNode.focus();
      }
    }
  }
}
