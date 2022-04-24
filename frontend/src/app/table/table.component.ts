import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription, BehaviorSubject, Observable } from "rxjs";
import { Subject } from 'rxjs/Subject';
import { OrderModel } from '../order-summary/orderModel';
import { AddMenuService } from '../create-menu/AddMenu.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public addMenuService: AddMenuService
  ) {
    TableComponent.fireEvent.subscribe(res=> {
      this.close(res)
      });
    }

  locVal = '';
  curVal = '';
  name = '';
  paidClicked = false;
  orderNum = 0;
  curOrderList: any[];
  pastOrderList: any[] = [];
  oid: any[];
  today = new Date();
  private addInfoSub: Subscription;

  public static fireEvent: Subject<any> = new Subject();

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
          this.name = paramMap.get('restaurantName');
        });

      this.curOrderList = this.addMenuService.initCurOrder()
      this.formatDietaryRestrictions();

      this.addMenuService.getCurOrder().subscribe(curOrderList =>{
        this.curOrderList = curOrderList;
        this.formatDietaryRestrictions();
      });

      // this.addMenuService.getPastOrders();
      // this.addInfoSub = this.addMenuService.getAddDataListener().subscribe((pastOrderList: any[])=>{
      //   this.pastOrderList = pastOrderList;
      //   console.log(this.pastOrderList)
      // });
  }

  onItemChange(value){
    console.log("Value is: ", value);
    this.curVal = value
  }

  updateProgress(state){
    for (let i = 0; i< (this.curOrderList.length); i++){
        if (this.curOrderList[i].id == this.curVal && state !="Paid" && state != "Past"){
          this.curOrderList[i].status = state
        }else if (this.curOrderList[i].id == this.curVal){
          this.orderNum = this.curOrderList[i].id
          this.paidClicked = true;
        }
      }
      this.updateOrderList(this.curOrderList)
  }

  close(res){
    if (this.paidClicked == true && res == true){
      for (let i = 0; i< (this.curOrderList.length); i++){
        if (this.curOrderList[i].id == this.curVal){
          this.curOrderList[i].status = "Paid"
          this.curOrderList[i].timeCompleted = this.date()
          // this.pastOrderList.push(this.curOrderList[i])
          console.log("ERE", this.curOrderList)
          this.addMenuService.addPastOrder(this.curOrderList[i].id, this.curOrderList[i].tableNum, this.curOrderList[i].order, this.curOrderList[i].specialNotes, this.curOrderList[i].tab, this.curOrderList[i].order[0].restaurantId, this.curOrderList[i].status, this.curOrderList[i].timeCompleted)
          this.curOrderList = this.curOrderList.filter(item => item.id !== this.curOrderList[i].id);
        }
      }
    }
    this.paidClicked = false;
  }

  //dietary restrictions is an array, want to display restrictions in comma separated string if more than one restriction
  formatDietaryRestrictions(){
    for (let i = 0; i < this.curOrderList.length; i++){
      for(let j=0; j < this.curOrderList[i].order; j++){
        if (this.curOrderList[i].order[j].dietaryRestrictions && this.curOrderList[i].order[j].dietaryRestrictions.length > 1){
          this.curOrderList[i].order[j].formatDietaryRestrictions = this.curOrderList[i].order[j].dietaryRestrictions.join(", ")
        }else{
          this.curOrderList[i].order[j].formatDietaryRestrictions = this.curOrderList[i].order[j].dietaryRestrictions
        }
      }
  }
}


updateOrderList(orderList){
  this.addMenuService.updateOrderList(orderList)
}

updatePastOrderList(orderList){
  this.addMenuService.updatePastOrderList(orderList)
}

date(){
  var now = ''
  now += this.today.getDate() + "/"
  now += (this.today.getMonth() + 1) + '/'
  now += this.today.getFullYear() + ' '

  now += this.today.getHours() + ':'
  now += this.today.getMinutes() + ':'
  now += this.today.getMilliseconds()
  return now
}

}
