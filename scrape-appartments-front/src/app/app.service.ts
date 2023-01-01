import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  URL = "http://localhost:3000/appartments";

  constructor(private http: HttpClient) { }

  getAppartments(){
    return this.http.get(this.URL);
  }
}
