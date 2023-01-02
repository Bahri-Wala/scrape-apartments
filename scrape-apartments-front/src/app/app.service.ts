import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  URL = "http://localhost:3000/apartments";

  constructor(private http: HttpClient) { }

  getApartments(){
    return this.http.get(this.URL);
  }
}
