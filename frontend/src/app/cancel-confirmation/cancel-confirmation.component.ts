import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";
import { OrderComponent } from '../order/order.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-cancel-confirmation',
  templateUrl: './cancel-confirmation.component.html',
  styleUrls: ['./cancel-confirmation.component.css']
})
export class CancelConfirmationComponent implements OnInit {
  @Input() buttonClicked = '';
  @Input() orderNum = 0;
  mode = '';

  constructor(
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
       if (paramMap.has('orderId')){
         this.mode = 'order';
       }else{
         this.mode = 'dash';
       }
       });
  }

  close(){
    if(this.mode == "order"){
      OrderComponent.fireEvent.next(false);
    }else{
      TableComponent.fireEvent.next(false);
    }
  }

  no(){
    if(this.mode == "order"){
      OrderComponent.fireEvent.next(false);
    }
      TableComponent.fireEvent.next(false);
  }

  yes(){
    if(this.mode == "order"){
      OrderComponent.fireEvent.next(true);
    }
    TableComponent.fireEvent.next(true);
  }

}
