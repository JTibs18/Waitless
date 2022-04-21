import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";
import { GetMenuService } from '../main-menu/getMenu.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  tableNum = '';
  restaurantID = '';
  itemId = '';
  data: any;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public getMenuService: GetMenuService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
         this.restaurantID = paramMap.get('restaurantID');
         this.tableNum = paramMap.get('tableNumber');
         this.itemId = paramMap.get('menuItem');
         console.log("ERE", this.itemId)
        });


      this.getMenuService.getMenuItem(this.restaurantID, this.itemId).subscribe(item =>{
        this.data = {
          id: item._id,
          itemName: item.itemName,
          description: item.description,
          ingredients: item.ingredients,
          price: item.price,
          calories: item.calories,
          imagePath: item.imagePath,
          restaurantId: item.restaurantId,
          tags: item.tags,
          Quantity: 0
        }
      console.log(this.data)});

  }

  increaseQuant(){
    this.data.Quantity += 1
  }

  decreaseQuant(){
    if (this.data.Quantity > 0){
      this.data.Quantity -= 1
    }
  }
}
