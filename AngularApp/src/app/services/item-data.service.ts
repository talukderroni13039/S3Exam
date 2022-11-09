import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable()
export class ItemDataService 
{
  private ctrName = "Item";
  baseUrl: string = "http://localhost:6001/api/";

  constructor(private http: HttpClient  ) 
  {

  }

  getItemList() 
  {
    return this.http.get<any>  (this.baseUrl +this.ctrName  + "/GetItemList")
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  getItemById(id:any) 
  {
    let data={
      Id:id
    };
    return this.http.get<any>  (this.baseUrl +this.ctrName  + "/GetItemById", { params: data, observe: 'response' })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  getConversionUnit():any
  {
    return this.http.get<any>  (this.baseUrl +this.ctrName  + "/GetConversionUnit")
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  
  save(entity: any) 
  {
    return  this.http.post<any>(this.baseUrl + this.ctrName + "/SaveItem", entity)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  uploadImage(entity: any) 
  {
    return  this.http.post<any>(this.baseUrl + this.ctrName + "/UploadImageWithData", entity)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  

}
