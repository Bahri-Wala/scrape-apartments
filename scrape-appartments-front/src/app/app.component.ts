import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchText:string = "";
  appartments:any;
  curPage:number = 1;
  itemsPerPage:number = 30;
  totalAppartments:any;


  constructor(private appService:AppService) {}

  ngOnInit(): void {
    this.appService.getAppartments().subscribe((res:any) =>{
      this.appartments = res;
      this.totalAppartments = res.length;
    })
  }

}
