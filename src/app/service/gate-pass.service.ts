import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedServiceService } from './shared-service.service';
import { ResponseObj } from '../model/responceObj';

@Injectable({
  providedIn: 'root'
})
export class GatePassService {
  baseURL;


  constructor(private http: HttpClient, private sharedService: SharedServiceService) {
    this.baseURL = sharedService.getBaseUrl();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  createGatePassEntry(gatePassEntry: any) {
    console.log("gatePassEntry['phoneNumber'] service", gatePassEntry['phoneNumber']);
    var requestObj = {
      "name": gatePassEntry['name'],
      "email": gatePassEntry['email'],
      "dob": gatePassEntry['dob'],
      "phoneNumber": gatePassEntry['phoneNumber'],
      "entryDate": gatePassEntry['entryDate'],
    }
    var apiURL = this.baseURL + "/gatePassEntry";
    return this.http.post<ResponseObj>(apiURL, requestObj, this.httpOptions);
  }

  uploadImages(selectedFile: any, type: any, id: any) {

    console.log("this.ff selectedFile", selectedFile);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('gp_id', id);
    formData.append("type", type);
    var apiURL = this.baseURL + "/media/imageUpload";
    return this.http.post(apiURL, formData);
  }
}
