import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public url: string = 'http://54.202.218.249:9501/api';

  constructor(public http: HttpClient) { }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(`${this.url}/${endpoint}`, body, reqOpts);
  }
  get(endpoint: string) {
    return this.http.get(`${this.url}/${endpoint}`);
  }
   put(endpoint:any, data: any) {
    return this.http.put(`${this.url}/${endpoint}`, data);
  }
  delete(endpoint:any,id?:any) {
    return this.http.delete(`${this.url}/${endpoint}/${id}`);
  }

  public createUser(userData:any) {
    userData.phoneNumber=userData.phoneNumber.concat(userData.phoneNumber2,userData.phoneNumber3)
    delete userData.phoneNumber2;
    delete userData.phoneNumber3;
    delete userData.id;
    return this.http.post<any>(this.url+ "/users",userData)
      .pipe(catchError(this.handleError));
  }

  public updateUser(id:any,userData:any) {
    userData.phoneNumber=userData.phoneNumber.concat(userData.phoneNumber2,userData.phoneNumber3)
    delete userData.phoneNumber2;
    delete userData.phoneNumber3;
    delete userData.id;
    return this.http.put(this.url+ "/users/"+id,userData)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      alert("Client Side Error =" + error.message);
    } else {
      alert("Server Side Error=" + error.message);
    }
    return throwError(error);
  }

  getDataFromLocalStorage(name:any){
    const offlineData = localStorage.getItem(name);
    return offlineData ? JSON.parse(offlineData) : [];
  }

  saveDataToLocalStorage(name:any,data:any): void {
    localStorage.setItem(name, JSON.stringify(data));
  }

  removeDataFromLocalStorage(name:any){
    localStorage.removeItem(name);
  }
}
