import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";
import { Subject } from 'rxjs/Subject';
import { AddMenuService } from '../create-menu/AddMenu.service'

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
  curOrderList: any[];
  pastOrderList: any[] = [];
  orderId = ''
  currentOrder : any;
  today = new Date();
  private addInfoSub: Subscription;

  public static fireEvent: Subject<any> = new Subject();

  constructor(
  public route: ActivatedRoute,
  private router: Router,
  public addMenuService: AddMenuService) {
    OrderComponent.fireEvent.subscribe(res=> {
    this.close(res)
    });}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

          this.curOrderList = this.addMenuService.initCurOrder()
          this.formatDietaryRestrictions();

          this.addMenuService.getCurOrder();
          this.addInfoSub = this.addMenuService.getAddCurOrderListener().subscribe((curOrderList: any[])=>{
            this.curOrderList = curOrderList;
            console.log("J", this.curOrderList)
            this.formatDietaryRestrictions();
          });

          this.addMenuService.getPastOrders();
          this.addInfoSub = this.addMenuService.getAddPastOrderListener().subscribe((pastOrderList: any[])=>{
            this.pastOrderList = pastOrderList;
            console.log(this.pastOrderList)
          });

          if (paramMap.has('pastOrderId')){
            this.mode = 'pastOrders';
            this.orderId = paramMap.get('pastOrderId')

            this.currentOrder = this.addMenuService.getPastOrder(this.orderId)

          }
          if(paramMap.has('orderId')){
            this.mode = 'Dashboard';
            this.orderId = paramMap.get('orderId');
            this.currentOrder = this.getOrder(this.orderId, this.curOrderList)

          }
          console.log("THIS", this.currentOrder)

          this.name = paramMap.get('restaurantName');


        });
  }

  updateProgress(state){

  if (state == "Paid"){
    this.paidClicked = true;
 //need to check db for actual restuarant name

  }else{
    this.currentOrder[0].status = state
    // this.addMenuService.updateOrderList(this.curOrderList)
  }

  }

  cancel(){
    this.cancelClicked = true;
  }

  close(res){
    if (this.paidClicked == true && res == true){
      this.currentOrder[0].status = "Paid"
      this.curOrderList[0].timeCompleted = this.date()
      this.addMenuService.addPastOrder(this.curOrderList[0].id, this.curOrderList[0].tableNum, this.curOrderList[0].order, this.curOrderList[0].specialNotes, this.curOrderList[0].tab, this.curOrderList[0].order[0].restaurantId, this.curOrderList[0].status, this.curOrderList[0].timeCompleted)
      this.curOrderList = this.curOrderList.filter(item => item.id !== this.curOrderList[0].id);
      this.router.navigate(['Waitless/'+ this.name + '/Dashboard'])
    }

    if(this.cancelClicked == true && res == true){
      this.currentOrder[0].status = "Cancelled"
      this.curOrderList = this.curOrderList.filter(item => item.id !== this.curOrderList[0].id);
      // this.updateOrderList(this.curOrderList);
      this.router.navigate(['Waitless/'+ this.name + '/Dashboard']) //need to check db for actual restuarant name
    }

    this.cancelClicked = false;
    this.paidClicked = false;
  }

  getOrder(orderId, orderList){
    return orderList.filter(order => order.id === orderId);
  }

  formatDietaryRestrictions(){
      for(let j=0; j < this.currentOrder; j++){
        if (this.currentOrder[j].dietaryRestrictions && this.currentOrder[j].dietaryRestrictions.length > 1){
          this.currentOrder[j].formatDietaryRestrictions = this.currentOrder[j].dietaryRestrictions.join(", ")
        }else{
          this.currentOrder[j].formatDietaryRestrictions = this.currentOrder[j].dietaryRestrictions
        }
      }
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

  updateOrderList(orderList){
    this.addMenuService.updateOrderList(orderList)
  }

}
