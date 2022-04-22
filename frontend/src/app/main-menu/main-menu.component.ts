import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";
import { Subject } from 'rxjs/Subject';
import { Menu } from '../create-menu/menu.model';
import { GetMenuService } from './getMenu.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  restaurantID = '';
  restaurantName: any;
  nums= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
  tableNumber = '';
  dataList: any[] = [];
  tags: any;
  subscription: Subscription;

  private addInfoSub: Subscription;
  public static fireEvent: Subject<any> = new Subject();

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public getMenuService: GetMenuService
  ) {
    MainMenuComponent.fireEvent.subscribe(res=> {
      if (res.funct != "add"){
        this.remove(res.tagName);
      }
      });
    }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
         this.restaurantID = paramMap.get('restaurantID');
         this.tableNumber = paramMap.get('tableNumber');
        });

        if (this.getMenuService.getMainMenuFirst() == true){
          this.getMenuService.getMenu(this.restaurantID);
          this.addInfoSub = this.getMenuService.getAddDataListener().subscribe((dataList: Menu[])=>{
            this.dataList = dataList;
          });
        }else{
          this.dataList = this.getMenuService.getModifiedMenu()
        }

        this.getMenuService.getRestaurantName(this.restaurantID).subscribe(restName =>{
          this.restaurantName = restName
        console.log(restName)});

        this.subscription = this.getMenuService.curTags.subscribe(tags => this.tags = tags)
  }

  selectedNum = 0;

//event handler for the select element's change event
  selectChangeHandler (event: any, itemId) {
  //update the ui
  this.selectedNum = event.target.value;
  
  console.log(this.selectedNum, itemId)
  this.getMenuService.updateItemOrder(itemId, this.tags, this.selectedNum)
}

  remove(id) {
      this.tags = this.tags.filter(name => name !== id);
  }

  updates(){
    this.updateTags();
    this.getMenuService.mainMenu();
  }

  updateTags(){
    this.getMenuService.updateTags(this.tags)
  }

}
