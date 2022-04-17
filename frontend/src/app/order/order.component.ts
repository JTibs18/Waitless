import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  mode = "" //either equal to /dashboard/:orderId or /PastOrders/:orderId
  name = '';

  item = {id: 1, tableNo: 1, order: "Burger", quantity: 1, dietaryRestrictions: "Fish, Seafood, Dairy", specialNotes: "no cheese", status: "New", tab: 1.20 }

  pastOrder = {id: 1, tableNo: 1, order: "Burger", quantity: 1, dietaryRestrictions: "", specialNotes: "no cheese", status: "New", tab: 1.20, orderNum: 1, timeCompleted: "11:01:02 Jan/30/22" }
  constructor(
  public route: ActivatedRoute,
  private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
          console.log(paramMap)

          if (paramMap.has('pastOrderId')){
            this.mode = 'pastOrders'
          }

          if(paramMap.has('orderId')){
            this.mode = 'Dashboard'
          }

          console.log("THIS", this.mode)

          this.name = paramMap.get('restaurantName');
        });
  }

  updateProgress(state){
  this.item.status = state
  }

}
