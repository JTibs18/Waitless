import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  locVal = '';
  curVal = '';
  name = '';

  dummyData = [{id: 1, tableNo: 1, order: "Burger", quantity: 1, dietaryRestrictions: "", specialNotes: "no cheese", status: "New", tab: 1.20 },
               {id: 2, tableNo: 2, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10 },
             {id: 3, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10 },
             {id: 4, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10 },
           {id: 5, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10 },
           {id: 6, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10 }]

  constructor(
    public route: ActivatedRoute,
    private router: Router
  ) { }

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
      if (this.dummyData[i].id == Number(this.curVal)){
        this.dummyData[i].status = state
        console.log(this.dummyData[i])
      }
    }
  }
}
