import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Rdata } from '../add-info/rData.model';
import { AddInfoService } from '../add-info/add-info.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mini-menu',
  templateUrl: './mini-menu.component.html',
  styleUrls: ['./mini-menu.component.css']
})
export class MiniMenuComponent implements OnInit, OnDestroy{
  // @Input() inData: Rdata[] = [];
  dataList: Rdata[] = [];
  private addInfoSub: Subscription;

  constructor(public addInfoService: AddInfoService) {
   }

  ngOnInit() {
    // this.dataList = this.addInfoService.getData();
    this.addInfoService.getData();
    this.addInfoSub = this.addInfoService.getAddDataListener().subscribe((dataList: Rdata[])=>{
      this.dataList = dataList;
    });
  }

  ngOnDestroy(){
    this.addInfoSub.unsubscribe();
  }

}
