import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription, BehaviorSubject, Observable } from "rxjs";
import { GetMenuService } from '../main-menu/getMenu.service';
import { OrderModel} from './orderModel'
import { WebsocketService } from './websocket-service.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  tableNum = '';
  restaurantID = '';
  restaurantName: any;
  curOrder = [];
  prompt = "Please enter any special notes for the kitchen"
  notes = '';
  total = 0;
  sendOrder: OrderModel;
  recList: string[] = [];

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public getMenuService: GetMenuService,
    private websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
         this.restaurantID = paramMap.get('restaurantID');
         this.tableNum = paramMap.get('tableNumber');
        });

      this.getMenuService.getRestaurantName(this.restaurantID).subscribe(restName =>{
        this.restaurantName = restName
      console.log(restName)});

      this.curOrder = this.getMenuService.getOrderSummary();
      this.sum();
      this.formatDietaryRestrictions();

      this.websocketService.getNewRec().subscribe((rec: any) => {
      // this.recList.push(rec);
      if(rec.table == this.tableNum){
        this.getMenuService.setOID(rec.id)
        this.sendRec();
        this.router.navigate(['Waitless/'+ this.restaurantID + "/"+ this.tableNum + '/Order_Confirmation'])
      }
    })
  }

  sum(){
    for (let i = 0; i < this.curOrder.length; i++){
      this.total += Number(this.curOrder[i].price) * Number(this.curOrder[i].quantity)
    }
  }

  //Can get data from notes textbox. Need to do something with this data (send to dashboard via websocket)
  notesTest(){
    console.log(this.notes)
  }

  //dietary restrictions is an array, want to display restrictions in comma separated string if more than one restriction
  formatDietaryRestrictions(){
    for (let i = 0; i < this.curOrder.length; i++){
      console.log(this.curOrder[i].itemName, this.curOrder[i].dietaryRestrictions)
      if (this.curOrder[i].dietaryRestrictions && this.curOrder[i].dietaryRestrictions.length > 1){
        this.curOrder[i].formatDietaryRestrictions = this.curOrder[i].dietaryRestrictions.join(", ")
      }else{
        this.curOrder[i].formatDietaryRestrictions = this.curOrder[i].dietaryRestrictions
      }
  }
}

sendCurOrder() {
  this.sendOrder = {
    tableNum: this.tableNum,
    order: this.curOrder,
    specialNotes: this.notes,
    tab: this.total,
    restaurantId: this.restaurantID
  }
  this.websocketService.sendOrder(this.sendOrder);
}

sendRec() {
  this.websocketService.sendRec({tableNum: -1});
}

}
