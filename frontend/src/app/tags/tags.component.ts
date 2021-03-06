import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { DietaryRestrictionsComponent } from '../dietary-restrictions/dietary-restrictions.component';
import { ConfirmDietaryTagsComponent } from '../confirm-dietary-tags/confirm-dietary-tags.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
   @Input() tagName = '';
   mode = '';

  constructor(
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
       if (paramMap.has('tableNumber')){
         this.mode = 'default';

         if (this.route.snapshot.url.length > 3){
           this.mode = 'dr';
         }

       }else{
         this.mode = 'dash';
       }
       });
  }

  remove(tagName){
    if (this.mode == 'default'){
      MainMenuComponent.fireEvent.next({tagName: tagName, funct: "del"});
    }else if (this.mode == 'dr'){
      DietaryRestrictionsComponent.fireEvent.next({tagName: tagName, funct: "del"});
    }else if (this.mode == 'dash'){
      ConfirmDietaryTagsComponent.fireEvent.next({tagName: tagName, funct: "del"});

    }

  }

}
