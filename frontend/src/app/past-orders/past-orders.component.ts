import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";
import { AddMenuService } from '../create-menu/AddMenu.service'

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.css']
})
export class PastOrdersComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public addMenuService: AddMenuService
  ) { }

  name = '';
  pastOrderList: any[] = [];
  private addInfoSub: Subscription;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
          this.name = paramMap.get('restaurantName');
        });

        this.addMenuService.getPastOrders();
        this.addInfoSub = this.addMenuService.getAddPastOrderListener().subscribe((pastOrderList: any[])=>{
          this.pastOrderList = pastOrderList;
          console.log("J", this.pastOrderList)
        });
        console.log("HELLO", this.pastOrderList)
        }

}
