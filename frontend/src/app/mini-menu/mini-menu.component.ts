import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Rdata } from '../add-info/rData.model'; //delete
import { AddInfoService } from '../add-info/add-info.service'; //delete
import { Subscription } from 'rxjs';
import { AddMenuService } from '../create-menu/AddMenu.service';
import { Menu } from '../create-menu/menu.model'

@Component({
  selector: 'app-mini-menu',
  templateUrl: './mini-menu.component.html',
  styleUrls: ['./mini-menu.component.css']
})
export class MiniMenuComponent implements OnInit, OnDestroy{
  // @Input() inData: Rdata[] = [];
  dataList: Menu[] = [];
  private addInfoSub: Subscription;

  constructor( public AddMenuService: AddMenuService) {
   }

  ngOnInit() {
    // this.dataList = this.addInfoService.getData();
    this.AddMenuService.getData();
    this.addInfoSub = this.AddMenuService.getAddDataListener().subscribe((dataList: Menu[])=>{
      this.dataList = dataList;
    });
  }

  ngOnDestroy(){
    this.addInfoSub.unsubscribe();
  }

  onDelete(menuDataId: string){
    this.AddMenuService.getData();
    this.AddMenuService.deleteItem(menuDataId);
  }

}
