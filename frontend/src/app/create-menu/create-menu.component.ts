import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Menu } from '../create-menu/menu.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AddMenuService } from '../create-menu/AddMenu.service';
import { AddInfoService } from "../add-info/add-info.service";
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { mimeType } from './mime-type.validator';
import { Subscription } from "rxjs";
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit {

  constructor(
    public addMenuService: AddMenuService,
    private addInfoService: AddInfoService,
    public route: ActivatedRoute,
    private router: Router
  ){
    CreateMenuComponent.fireEvent.subscribe(res=> {
      this.completeSaveItem(res)
      }); }

  first = true;
  menu = '';
  mode = 'create';
  imagePicker = 'True';
  curItem: any;
  itemId: string;
  data: Menu;
  form: FormGroup;
  imagePreview: string;
  dietaryTagsPopup = false;

  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  restaurantName = this.addInfoService.getRestaurantName();
  public static fireEvent: Subject<any> = new Subject();

  labelText = [{label: "Item Name", st: "label1", prompt: "Delicious dish name", tbClass: "t1", inVar: "itemName"},
               {label: "Description", st: "label2", prompt: "Fresh spinach, mushrooms, and hard-boiled egg", tbClass: "t2", inVar: "description"},
               {label: "Ingredients", st:"label3", prompt:"spinach, mushrooms, egg, bacon vinaigrette", tbClass: "t3", inVar: "ingredients"},
               {label: "Price", st: "label4", prompt:"9.99", tbClass: "t4", inVar: "price"},
               {label: "Calories", st:"label5", prompt:"420", tbClass: "t5", inVar: "calories"}
        ]

  menuLabels = ["itemName", "description", "ingredients", "price" , "calories" ]

  ngOnInit(): void {
    this.form = new FormGroup({
      'itemName': new FormControl(null, {validators: [Validators.required]}),
      'description': new FormControl(null, {validators: [Validators.required]}),
      'ingredients': new FormControl(null, {validators: [Validators.required]}),
      'price': new FormControl(null, {validators: [Validators.required]}),
      'calories': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {

        if (paramMap.has('itemId')){
          this.mode = 'edit';
          this.imagePicker = 'False';
          this.itemId = paramMap.get('itemId');
          // this.data = this.addMenuService.getItem(this.itemId);
          this.addMenuService.getItem(this.itemId).subscribe(menuData =>{
            this.data = {
              id: menuData._id,
              itemName: menuData.itemName,
              description: menuData.description,
              ingredients: menuData.ingredients,
              price: menuData.price,
              calories: menuData.calories,
              imagePath: menuData.imagePath,
              restaurantId: menuData.restaurantId,
              tags: menuData.tags
            };
            this.form.setValue({'itemName': this.data.itemName,
                                'description': this.data.description,
                                'ingredients': this.data.ingredients,
                                'price': this.data.price,
                                'calories': this.data.calories,
                                'image': this.data.imagePath
                              }
                              );
          });
        }
        else{
          this.mode = 'create';
          this.itemId = null;
        }
    });

    this.userIsAuthenticated = this.addInfoService.getIsAuth();

    this.authListenerSubs = this.addInfoService.getAuthStatusListener().subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
    });
  }

  onImagePicked(event: Event){
    this.imagePicker = 'True';
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveItem(){
    if (this.form.invalid && this.mode ==='create'){
      // this.form.reset();
      return
    }
    this.first = false;


    if (this.mode === 'create'){
      this.curItem = {itemName: this.form.value.itemName, description: this.form.value.description, ingredients: this.form.value.ingredients, price: this.form.value.price, calories: this.form.value.calories, image:this.form.value.image, tags:[] }
    }else{
      this.curItem = {itemId: this.itemId, itemName: this.form.value.itemName, description: this.form.value.description, ingredients: this.form.value.ingredients, price: this.form.value.price, calories: this.form.value.calories, image:this.form.value.image, tags:[] }
    }
    // this.mode = 'create'

    this.dietaryTagsPopup = true;
    // this.addInfoService.addData(form.value)
    // this.addMenuService.addData(form.value.itemName, form.value.des, form.value.ingred, form.value.price, form.value.cals)

    this.form.reset();
  }

  completeSaveItem(dietaryRestrictions){
    this.dietaryTagsPopup = false;
    console.log(dietaryRestrictions)

    this.curItem.tags = dietaryRestrictions

    if (this.mode === 'create'){
      this.addMenuService.addData(this.curItem.itemName, this.curItem.description, this.curItem.ingredients, this.curItem.price, this.curItem.calories, this.curItem.image, this.curItem.tags)
    }else{
      this.addMenuService.updateItem(this.curItem.itemId, this.curItem.itemName, this.curItem.description, this.curItem.ingredients, this.curItem.price, this.curItem.calories, this.curItem.image, this.curItem.tags)
      this.router.navigate(['/Waitless/' + this.restaurantName + '/Create_Menu'])
    }

  }

  saveAndExit(){
    this.router.navigate(['Waitless/'+ this.restaurantName + '/Dashboard']) //need to check db for actual restuarant name

  }

}
