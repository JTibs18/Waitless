import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CreateMenuComponent } from '../create-menu/create-menu.component'
@Component({
  selector: 'app-confirm-dietary-tags',
  templateUrl: './confirm-dietary-tags.component.html',
  styleUrls: ['./confirm-dietary-tags.component.css']
})
export class ConfirmDietaryTagsComponent implements OnInit {
  dummyTagSuggestions = ["Dairy", "Egg", "Meat", "Fish", "Shellfish", "Gluten", "Peanuts", "Treenuts", "Soy", "Honey"]
  prompt = "Type a dietary restriction and press Enter";
  dietaryRestriction = '';
  tagNames = []

  public static fireEvent: Subject<any> = new Subject();

  constructor() {
    ConfirmDietaryTagsComponent.fireEvent.subscribe(res=> {
          if (res.funct == "add"){
            this.add(res.tagName);
            this.removeFrom(res.tagName)
          }else{
            this.remove(res.tagName);
            this.addTo(res.tagName);
          }
        }); }

  ngOnInit(): void {
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

  save(){
    CreateMenuComponent.fireEvent.next(this.tagNames);
  }

}
