import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  tableNum = '';
  restaurantName = '';
  dummyData = {itemId: 1, itemName: "Pasta", description: "Fresh Spaghetti with Sauce", ingredients: "Spagehetti pasta, tomato, garlic, basil, onion, carrot, celery", price: "18.99", calories: "300", imagePath:"http://localhost:3000/images/pasta-1647214491612.jpeg", restaurantId:"622e7f2ca4d77322ce8936ad", Quantity: 0}

  constructor(
    public route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
         this.restaurantName = paramMap.get('restaurantName');
         this.tableNum = paramMap.get('tableNumber');
        });
  }

  increaseQuant(){
    this.dummyData.Quantity += 1
  }

  decreaseQuant(){
    if (this.dummyData.Quantity > 0){
      this.dummyData.Quantity -= 1
    }
  }
}
