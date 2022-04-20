import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-dietary-restrictions',
  templateUrl: './dietary-restrictions.component.html',
  styleUrls: ['./dietary-restrictions.component.css']
})
export class DietaryRestrictionsComponent implements OnInit {
  tableNum = '';
  restaurantName = '';
  dietaryRestriction = '';
  listOfRestrictions = [];
  tagNames = []

  dummyTagSuggestions = ["Vegan", "Dairy", "Keto", "Seafood", "Peanuts", "Almonds"]
  public static fireEvent: Subject<any> = new Subject();

  prompt = "Type a dietary restriction and press Enter";

  constructor(
    public route: ActivatedRoute,
    private router: Router
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
         this.restaurantName = paramMap.get('restaurantName');
         this.tableNum = paramMap.get('tableNumber');
        });
  }

  remove(id) {
      this.tagNames = this.tagNames.filter(name => name !== id);
  }

  removeFrom(id) {
      this.dummyTagSuggestions = this.dummyTagSuggestions.filter(name => name !== id);
  }

  add(tagName){
    if (!this.tagNames.includes(tagName)){
      this.tagNames.push(tagName)
    }
  }

  addTo(tagName){
    if (!this.dummyTagSuggestions.includes(tagName)){
      this.dummyTagSuggestions.push(tagName)
    }
  }

}
