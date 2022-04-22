import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";
import { GetMenuService } from '../main-menu/getMenu.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  tableNum = '';
  restaurantID = '';
  itemId = '';
  curItem: any;
  quantity = 0;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public getMenuService: GetMenuService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
         this.restaurantID = paramMap.get('restaurantID');
         this.tableNum = paramMap.get('tableNumber');
         this.itemId = paramMap.get('menuItem');
         // console.log("ERE", this.itemId)
        });

      this.curItem = this.getMenuService.getItem(this.restaurantID, this.itemId)

      if(this.curItem.quantity){
        this.quantity = Number(this.curItem.quantity)
      }
  }

  increaseQuant(){
    this.quantity += 1
  }

  decreaseQuant(){
    if (this.quantity > 0){
        this.quantity -= 1
    }
  }

  updateOrder(){
    this.getMenuService.updateItemOrder(this.itemId, this.curItem.tags, this.quantity)
  }

}
