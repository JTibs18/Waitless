import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.css']
})
export class PastOrdersComponent implements OnInit {
  name = '';

  dummyData = [{id: 1, tableNo: 1, order: "Burger", quantity: 1, dietaryRestrictions: "", specialNotes: "no cheese", status: "New", tab: 1.20, orderNum: 1, timeCompleted: "11:01:02 Jan/30/22" },
               {id: 2, tableNo: 2, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10, orderNum: 2, timeCompleted: "11:01:02 Jan/30/22"  },
               {id: 3, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10, orderNum: 3, timeCompleted: "11:01:02 Jan/30/22"  },
               {id: 4, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10, orderNum: 4, timeCompleted: "11:01:02 Jan/30/22"  },
               {id: 5, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10, orderNum: 5, timeCompleted: "11:01:02 Jan/30/22"  },
               {id: 6, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10, orderNum: 6, timeCompleted: "11:01:02 Jan/30/22"  },
               {id: 1, tableNo: 1, order: "Burger", quantity: 1, dietaryRestrictions: "", specialNotes: "no cheese", status: "New", tab: 1.20, orderNum: 1, timeCompleted: "11:01:02 Jan/30/22" },
               {id: 2, tableNo: 2, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10, orderNum: 2, timeCompleted: "11:01:02 Jan/30/22"  },
               {id: 3, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10, orderNum: 3, timeCompleted: "11:01:02 Jan/30/22"  },
               {id: 4, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10, orderNum: 4, timeCompleted: "11:01:02 Jan/30/22"  },
               {id: 5, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10, orderNum: 5, timeCompleted: "11:01:02 Jan/30/22"  },
               {id: 6, tableNo: 3, order: "Pasta", quantity: 2, dietaryRestrictions: "Cheese", specialNotes: "no cheese", status: "New", tab: 11.10, orderNum: 6, timeCompleted: "11:01:02 Jan/30/22"  }]

  constructor(
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
          this.name = paramMap.get('restaurantName');
        });
  }

}
