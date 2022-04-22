import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";
import { Subject } from 'rxjs/Subject';
import { GetMenuService } from '../main-menu/getMenu.service';


@Component({
  selector: 'app-dietary-restrictions',
  templateUrl: './dietary-restrictions.component.html',
  styleUrls: ['./dietary-restrictions.component.css']
})
export class DietaryRestrictionsComponent implements OnInit {
  tableNum = '';
  restaurantID = '';
  dietaryRestriction = '';
  listOfRestrictions = [];
  // tagNames = []

  tagSuggestions = ["No Dairy", "No Egg", "No Meat", "No Fish", "No Shellfish", "No Gluten", "No Peanuts", "No Treenuts", "No Soy", "No Honey"]
  public static fireEvent: Subject<any> = new Subject();

  prompt = "Type a dietary restriction and press Enter";
  dietaryRestrictions: any;
  subscription: Subscription;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public getMenuService: GetMenuService
  ) {    DietaryRestrictionsComponent.fireEvent.subscribe(res=> {
          if (res.funct == "add"){
            this.add(res.tagName);
            this.removeFrom(res.tagName)
          }else{
            this.remove(res.tagName);
            this.addTo(res.tagName);
          }
        }); }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
         this.restaurantID = paramMap.get('restaurantID');
         this.tableNum = paramMap.get('tableNumber');
        });

    this.subscription = this.getMenuService.curTags.subscribe(tags => this.dietaryRestrictions = tags)

    for (let i = 0; i < this.dietaryRestrictions.length; i++){
      this.removeFrom(this.dietaryRestrictions[i])
    }
  }

  remove(id) {
      this.dietaryRestrictions = this.dietaryRestrictions.filter(name => name !== id);
  }

  removeFrom(id) {
      this.tagSuggestions = this.tagSuggestions.filter(name => name !== id);
  }

  add(tagName){
    if (!this.dietaryRestrictions.includes(tagName)){
      this.dietaryRestrictions.push(tagName)
    }
  }

  addTo(tagName){
    if (!this.tagSuggestions.includes(tagName)){
      this.tagSuggestions.push(tagName)
    }
  }

  updateDietaryRestrictions(){
    this.getMenuService.updateDietaryRestrictions(this.dietaryRestrictions)
  }
}
