import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Menu } from '../create-menu/menu.model';
import { NgForm } from '@angular/forms';
import { AddMenuService } from '../create-menu/AddMenu.service';



@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit {
  menu = ""

  labelText = [{label: "Item Name", st: "label1", prompt: "delicious dish name", tbClass: "t1", inVar: "itemName"},
               {label: "Description", st: "label2", prompt: "Fresh spinach, mushrooms, and hard-boiled egg served with warm bacon vinaigrette", tbClass: "t2", inVar: "des"},
               {label: "Ingredients", st:"label3", prompt:"spinach, mushrooms, egg, bacon vinaigrette", tbClass: "t3", inVar: "ingred"},
               {label: "Price", st: "label4", prompt:"9.99", tbClass: "t4", inVar: "price"},
               {label: "Calories", st:"label5", prompt:"420", tbClass: "t5", inVar: "cals"},
        ]
  constructor(public addMenuService: AddMenuService) { }

  ngOnInit(): void {
  }

  onAddItem(form: NgForm){
    if (form.invalid){
      return
    }

    // this.addInfoService.addData(form.value)
    this.addMenuService.addData(form.value.itemName, form.value.des, form.value.ingred, form.value.price, form.value.cals)

    form.resetForm();

  }

}
