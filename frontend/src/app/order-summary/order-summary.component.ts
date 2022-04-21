import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";
import { GetMenuService } from '../main-menu/getMenu.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  tableNum = '';
  restaurantID = '';
  restaurantName: any;

  dummyData = [{id: 1, tableNo: 1, order: "Burger", quantity: 1, dietaryRestrictions: "", specialNotes: "no cheese", tab: 1.20 },
               {id: 2, tableNo: 2, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", tab: 11.10 },
             {id: 3, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", tab: 11.10 },
             {id: 4, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", tab: 11.10 },
           {id: 5, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", tab: 11.10 },
           {id: 6, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", tab: 11.10 }]
dummyTotal = 420

prompt = "Please enter any special notes for the kitchen"
notes = '';

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

      this.getMenuService.getRestaurantName(this.restaurantID).subscribe(restName =>{
        this.restaurantName = restName
      console.log(restName)});
  }

}
