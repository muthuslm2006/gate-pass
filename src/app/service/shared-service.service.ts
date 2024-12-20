import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  baseUrl: String;

  constructor() {
    this.baseUrl = "http://localhost:8080";
    //this.baseUrl = "http://13.232.224.37:8080/raymondsafetyadmin/rest/api/v1";

  }

  getBaseUrl() {
    return this.baseUrl;
  }

}
