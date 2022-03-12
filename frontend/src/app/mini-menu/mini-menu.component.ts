import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Rdata } from '../add-info/rData.model'; //delete
import { AddInfoService } from '../add-info/add-info.service'; //delete
import { Subscription } from 'rxjs';
import { AddMenuService } from '../create-menu/AddMenu.service';
import { Menu } from '../create-menu/menu.model'
// import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-mini-menu',
  templateUrl: './mini-menu.component.html',
  styleUrls: ['./mini-menu.component.css']
})
export class MiniMenuComponent implements OnInit, OnDestroy{
  // @Input() inData: Rdata[] = [];
  private addInfoSub: Subscription;
  private authStatusSub :Subscription;

  dataList: Menu[] = [];
  userId: string;
  restaurantName: string;
  userIsAuthenticated = false;


  constructor( public AddMenuService: AddMenuService, public addInfoService: AddInfoService) {}

  ngOnInit() {
    this.userId = this.addInfoService.getUserId();
    this.restaurantName = this.addInfoService.getRestaurantName();
    this.userIsAuthenticated = this.addInfoService.getIsAuth();
    this.authStatusSub = this.addInfoService.getAuthStatiusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.addInfoService.getUserId();
      this.restaurantName = this.addInfoService.getRestaurantName();
    });

    // this.dataList = this.addInfoService.getData();
    this.AddMenuService.getData();
    this.addInfoSub = this.AddMenuService.getAddDataListener().subscribe((dataList: Menu[])=>{
      this.dataList = dataList;
      console.log(this.dataList)
    });
  }

  ngOnDestroy(){
    this.addInfoSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onDelete(menuDataId: string){
    this.AddMenuService.getData();
    this.AddMenuService.deleteItem(menuDataId);
  }

}
