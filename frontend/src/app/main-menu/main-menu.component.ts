import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";
import { Subject } from 'rxjs/Subject';
import { Menu } from '../create-menu/menu.model';
import { GetMenuService } from './getMenu.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  restaurantID = '';
  restaurantName: any;
  nums= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
  tableNumber = '';
  dataList: any[] = [];
  dietaryRestrictions: any;
  subscription: Subscription;

  private addInfoSub: Subscription;
  public static fireEvent: Subject<any> = new Subject();

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public getMenuService: GetMenuService
  ) {
    MainMenuComponent.fireEvent.subscribe(res=> {
      if (res.funct != "add"){
        this.remove(res.tagName);
      }
      });
    }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
         this.restaurantID = paramMap.get('restaurantID');
         this.tableNumber = paramMap.get('tableNumber');
        });

        if (this.getMenuService.getMainMenuFirst() == true){
          this.getMenuService.getMenu(this.restaurantID);
          this.addInfoSub = this.getMenuService.getAddDataListener().subscribe((dataList: Menu[])=>{
            this.dataList = dataList;
          });
        }else{
          this.dataList = this.getMenuService.getModifiedMenu()
        }

        this.getMenuService.getRestaurantName(this.restaurantID).subscribe(restName =>{
          this.restaurantName = restName
        console.log(restName)});

        this.subscription = this.getMenuService.curTags.subscribe(tags => this.dietaryRestrictions = tags)

        this.colorMenu()
        this.sortMenu()
  }

  selectedNum = 0;

//event handler for the select element's change event
  selectChangeHandler (event: any, itemId) {
  //update the ui
  this.selectedNum = event.target.value;

  this.getMenuService.updateItemOrder(itemId, this.dietaryRestrictions, this.selectedNum)

  const oldItemIndex = this.dataList.findIndex(i => i.id === itemId);
  this.dataList[oldItemIndex] = {itemName: this.dataList[oldItemIndex].itemName, description: this.dataList[oldItemIndex].description, ingredients: this.dataList[oldItemIndex].ingredients, price: this.dataList[oldItemIndex].price, calories: this.dataList[oldItemIndex].calories, id: itemId, imagePath: this.dataList[oldItemIndex].imagePath, restaurantId: this.dataList[oldItemIndex].restaurantId, tags: this.dataList[oldItemIndex].tags, quantity: this.selectedNum, dietaryRestrictions: this.dietaryRestrictions};
  this.colorMenu()
  this.sortMenu()
}

  remove(id) {
      this.dietaryRestrictions = this.dietaryRestrictions.filter(name => name !== id);
      this.colorMenu()
      this.sortMenu()
  }

  updates(caller){
    var noOrder = true

    for (let i = 0; i < this.dataList.length; i++){
      if(this.dataList[i].quantity){
        noOrder = false
      }
    }
    this.updateDietaryRestrictions();
    this.getMenuService.mainMenu();

    if(!noOrder && caller == 'submit'){

      this.router.navigate(['Waitless/'+ this.restaurantID + '/' + this.tableNumber + '/Order_Summary']) //need to check db for actual restuarant name
    }
  }

  updateDietaryRestrictions(){
    this.getMenuService.updateDietaryRestrictions(this.dietaryRestrictions)

  }

  colorMenu(){
    var checkTag = [];
    console.log("DR", this.dataList.length)

    //reset all colours unless selected
    for (let i = 0; i < this.dataList.length; i++){
      console.log("T"   )
      if (this.dataList[i].quantity > 0){
        console.log(this.dataList[i])
        this.dataList[i].color = "blue"
      }else{
        this.dataList[i].color = ""
      }
  }

    //find current dietary restrictions entered by user
    for (let i = 0; i < this.dietaryRestrictions.length; i++){
      checkTag.push(this.dietaryRestrictions[i].slice(3))
    }

    //compare item's dietary tags to user's dietary restrictions. If match, color is red
    for (let i = 0; i < this.dataList.length; i++){
      for (let j = 0; j < checkTag.length; j++){
        if (this.dataList[i].tags.includes(checkTag[j]) && this.dataList[i].color != "blue"){
          this.dataList[i].color = "red"
      }
    }
  }

  //any items that are not coloured get the colour green
  for (let i = 0; i < this.dataList.length; i++){
    if (!this.dataList[i].color || this.dataList[i].color == ""){
      this.dataList[i].color = "green"
    }
  }

  }

  sortMenu(){
    this.dataList.sort((a, b) => a.color.localeCompare(b.color));
  }

}
