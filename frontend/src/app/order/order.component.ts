import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  mode = "" //either equal to /dashboard/:orderId or /PastOrders/:orderId
  name = '';
  cancelClicked = false;
  paidClicked = false;
  public static fireEvent: Subject<any> = new Subject();

  item = {id: 1, tableNo: 1, order: "Burger", quantity: 1, dietaryRestrictions: "Fish, Seafood, Dairy", specialNotes: "no cheese", status: "New", tab: 1.20, orderNum: 1 }

  pastOrder = {id: 1, tableNo: 1, order: "Burger", quantity: 1, dietaryRestrictions: "", specialNotes: "no cheese", status: "New", tab: 1.20, orderNum: 1, timeCompleted: "11:01:02 Jan/30/22" }
  constructor(
  public route: ActivatedRoute,
  private router: Router) {
    OrderComponent.fireEvent.subscribe(res=> {
    this.close(res)
    });}

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

  if (state == "Paid"){
    this.paidClicked = true;
  }else{
    this.item.status = state
  }

  }

  cancel(){
    this.cancelClicked = true;
  }

  close(res){
    if (this.paidClicked == true && res == true){
      this.item.status = "Paid"
    }

    if(this.cancelClicked == true && res == true){
      this.item.status = "Cancelled"
      this.router.navigate(['Waitless/'+ this.name + '/Dashboard']) //need to check db for actual restuarant name
    }

    this.cancelClicked = false;
    this.paidClicked = false;
  }

}
