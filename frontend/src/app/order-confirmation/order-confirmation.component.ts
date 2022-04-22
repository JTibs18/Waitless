import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";
import { GetMenuService } from '../main-menu/getMenu.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  tableNum = '';
  restaurantID = '';
  orderNum = 1;
  message1 = "Thank you! Your order has been taken!"
  message2 = "Cancel will disappear when the kitchen begins preparing your order"

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public getMenuService: GetMenuService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
         this.restaurantID = paramMap.get('restaurantID');
         this.tableNum = paramMap.get('tableNumber');
        });
  }

  reset(){
    this.getMenuService.mainMenuReset();
    this.getMenuService.updateDietaryRestrictions([]);

  }

}
