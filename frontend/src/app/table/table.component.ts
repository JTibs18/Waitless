import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  locVal = '';
  curVal = '';
  name = '';
  paidClicked = false;
  orderNum = 0;


  dummyData = [{id: 1, tableNo: 1, order: "Burger", quantity: 1, dietaryRestrictions: "", specialNotes: "no cheese", status: "New", tab: 1.20,  orderNum: 1 },
               {id: 2, tableNo: 2, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10, orderNum: 21},
             {id: 3, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10,  orderNum: 3},
             {id: 4, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10, orderNum: 4 },
           {id: 5, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10, orderNum: 5 },
           {id: 6, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10,  orderNum: 6 }]

  public static fireEvent: Subject<any> = new Subject();

  constructor(
    public route: ActivatedRoute,
    private router: Router
  ) {
    TableComponent.fireEvent.subscribe(res=> {
      this.close(res)
      });}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
          this.name = paramMap.get('restaurantName');
        });
  }

  onItemChange(value){
    console.log("Value is: ", value);
    this.curVal = value
  }

  updateProgress(state){
    for (let i = 0; i< (this.dummyData.length); i++){
        if (this.dummyData[i].id == Number(this.curVal) && state !="Paid"){
          this.dummyData[i].status = state
        }else if (this.dummyData[i].id == Number(this.curVal)){
          this.orderNum = this.dummyData[i].orderNum
          this.paidClicked = true;
          
        }
      }
  }

  close(res){
    if (this.paidClicked == true && res == true){
      for (let i = 0; i< (this.dummyData.length); i++){
        if (this.dummyData[i].id == Number(this.curVal)){
          this.dummyData[i].status = "Paid"
        }
      }
    }

    this.paidClicked = false;
  }

}
