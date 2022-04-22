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
  order = [];
  prompt = "Please enter any special notes for the kitchen"
  notes = '';
  total = 0;

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

      this.order = this.getMenuService.getOrderSummary();
      console.log(this.order)
      this.sum();
      this.formatDietaryRestrictions();

  }

  sum(){
    for (let i = 0; i < this.order.length; i++){
      this.total += Number(this.order[i].price) * Number(this.order[i].quantity)
    }

  }

  //Can get data from notes textbox. Need to do something with this data (send to dashboard via websocket)
  notesTest(){
    console.log(this.notes)
  }

  //dietary restrictions is an array, want to display restrictions in comma separated string if more than one restriction
  formatDietaryRestrictions(){
    for (let i = 0; i < this.order.length; i++){
      console.log(this.order[i].itemName, this.order[i].dietaryRestrictions)
      if (this.order[i].dietaryRestrictions && this.order[i].dietaryRestrictions.length > 1){
        this.order[i].formatDietaryRestrictions = this.order[i].dietaryRestrictions.join(", ")
      }else{
        this.order[i].formatDietaryRestrictions = this.order[i].dietaryRestrictions
      }
  }
}

}
