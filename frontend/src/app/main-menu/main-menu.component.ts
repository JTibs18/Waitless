import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  restaurantName = '';
  dummyData = [{itemId: 1, itemName: "Pasta", description: "Fresh Spaghetti with Sauce", ingredients: "Spagehetti pasta, tomato, garlic, basil, onion, carrot, celery", price: "18.99", calories: "300", imagePath:"http://localhost:3000/images/pasta-1647214491612.jpeg", restaurantId:"622e7f2ca4d77322ce8936ad", Quantity: 0},
               {itemId: 2, itemName: "Nachos", description: "Delicious chips with savory toppings", ingredients: "tortilla chips, avocado, lime, salsa, tomato, lettuce, sour cream", price: "7.99", calories: "600", imagePath: "http://localhost:3000/images/nachos-1647214548434.png", restaurantId: "622e7f2ca4d77322ce8936ad", Quantity: 0 },
               {itemId: 3, itemName: "Pizza", description: "dairy free cheese pizza", ingredients: "yeast, flour, water, oil, dairy free cheese", price:"18.99", calories:"425", imagePath:"http://localhost:3000/images/pizza-1000.png", restaurantId:"gejposdg45s3d5sdfs4", Quantity: 0 },
               {itemId: 4, itemName: "Pasta", description: "Fresh Spaghetti with Sauce", ingredients: "Spagehetti pasta, tomato, garlic, basil, onion, carrot, celery", price: "18.99", calories: "300", imagePath:"http://localhost:3000/images/pasta-1647214491612.jpeg", restaurantId:"622e7f2ca4d77322ce8936ad", Quantity: 0},
               {itemId: 5, itemName: "Nachos", description: "Delicious chips with savory toppings", ingredients: "tortilla chips, avocado, lime, salsa, tomato, lettuce, sour cream", price: "7.99", calories: "600", imagePath: "http://localhost:3000/images/nachos-1647214548434.png", restaurantId: "622e7f2ca4d77322ce8936ad", Quantity: 0 },
               {itemId: 6, itemName: "Pizza", description: "dairy free cheese pizza", ingredients: "yeast, flour, water, oil, dairy free cheese", price:"18.99", calories:"425", imagePath:"http://localhost:3000/images/pizza-1000.png", restaurantId:"gejposdg45s3d5sdfs4" , Quantity: 0}]

  nums= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
  tableNumber = '';
  dummyTagSuggestions = ["No Dairy", "No Egg", "No Meat", "No Fish", "No Shellfish", "No Gluten", "No Peanuts", "No Treenuts", "No Soy", "No Honey"]

  public static fireEvent: Subject<any> = new Subject();

  constructor(
    public route: ActivatedRoute,
    private router: Router
  )
  {
    MainMenuComponent.fireEvent.subscribe(res=> {
      if (res.funct != "add"){
        this.remove(res.tagName);
      }
      });
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
         this.restaurantName = paramMap.get('restaurantName');
         this.tableNumber = paramMap.get('tableNumber');
        });
  }

  selectedNum = 0;

//event handler for the select element's change event
  selectChangeHandler (event: any, itemId) {
  //update the ui
  this.selectedNum = event.target.value;
  // console.log(this.selectedNum, itemId)
}

  remove(id) {
      this.dummyTagSuggestions = this.dummyTagSuggestions.filter(name => name !== id);
  }
}
