import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchText:string = "";
  apartments:any;
  curPage:number = 1;
  itemsPerPage:number = 30;
  totalApartments:any;


  constructor(private appService:AppService) {}

  ngOnInit(): void {
    this.appService.getApartments().subscribe((res:any) =>{
      this.apartments = res;
      this.totalApartments = res.length;
    })
  }

}
