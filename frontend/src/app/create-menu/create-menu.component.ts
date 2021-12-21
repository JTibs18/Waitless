import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Menu } from '../create-menu/menu.model';
import { NgForm } from '@angular/forms';
import { AddMenuService } from '../create-menu/AddMenu.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit {
  menu = '';
  mode = 'create';
  itemId: string;
  data: Menu;

  labelText = [{label: "Item Name", st: "label1", prompt: "Delicious dish name", tbClass: "t1", inVar: "itemName"},
               {label: "Description", st: "label2", prompt: "Fresh spinach, mushrooms, and hard-boiled egg", tbClass: "t2", inVar: "des"},
               {label: "Ingredients", st:"label3", prompt:"spinach, mushrooms, egg, bacon vinaigrette", tbClass: "t3", inVar: "ingred"},
               {label: "Price", st: "label4", prompt:"9.99", tbClass: "t4", inVar: "price"},
               {label: "Calories", st:"label5", prompt:"420", tbClass: "t5", inVar: "cals"}
        ]

  menuLabels = ["itemName", "description", "ingredients", "price" , "calories" ]

  constructor(public addMenuService: AddMenuService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('itemId')){
          this.mode = 'edit';
          this.itemId = paramMap.get('itemId');
          // this.data = this.addMenuService.getItem(this.itemId);
          this.addMenuService.getItem(this.itemId).subscribe(menuData =>{
            this.data = {
              id: menuData._id,
              itemName: menuData.itemName,
              description: menuData.description,
              ingredients: menuData.ingredients,
              price: menuData.price,
              calories: menuData.calories
            };
          });
        }else{
          this.mode = 'create';
          this.itemId = null;
        }
    });
  }


  onSaveItem(form: NgForm){

    if (form.invalid && this.mode ==='create'){
      return
    }


    if (this.mode === 'create'){
      this.addMenuService.addData(form.value.itemName, form.value.des, form.value.ingred, form.value.price, form.value.cals)
    }else{
      this.addMenuService.updateItem(this.itemId, form.value.itemName, form.value.des, form.value.ingred, form.value.price, form.value.cals)
      this.router.navigate(['/Waitless/Create_Menu'])
    }
    // this.mode = 'create'

    // this.addInfoService.addData(form.value)
    // this.addMenuService.addData(form.value.itemName, form.value.des, form.value.ingred, form.value.price, form.value.cals)

    form.resetForm();

  }

}
