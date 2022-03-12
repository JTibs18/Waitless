import { Component, OnInit } from '@angular/core';
import { Rdata } from './add-info/rData.model';
import { AddInfoService } from './add-info/add-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 // restData: Rdata[] = [];

  // onAddedInfo(rData){
  //   this.restData.push(rData);
  // }
  constructor(private addInfoService: AddInfoService  ){}

  ngOnInit(){
    this.addInfoService.autoAuthUser(); 
  }


}
