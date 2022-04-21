import { Menu } from './menu.model'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { AddInfoService } from "../add-info/add-info.service";


@Injectable({providedIn: 'root'})
export class AddMenuService{
   private dataList: Menu[] = [];
   private dataUpdated = new Subject<any[]>();

   constructor(private http: HttpClient, private addInfoService: AddInfoService){}

   getData(){
     this.http
      .get<{message: string, data: any}>('http://localhost:3000/Waitless/' + this.addInfoService.getRestaurantName() +'/Create_Menu')
      .pipe(map((menuData)=>{
        return menuData.data.map(data =>{
          return {
            itemName: data.itemName,
            description: data.description,
            ingredients: data.ingredients,
            price: data.price,
            calories: data.calories,
            id: data._id,
            imagePath: data.imagePath,
            restaurantId: data.restaurantId,
            tags: data.tags
          };
        });
      }))
      .subscribe((transformedData)=>{
        this.dataList = transformedData;
        this.dataUpdated.next([...this.dataList]);

     });
     // return [...this.dataList];
   }

   getMenu(){
     this.http
      .get<{message: string, data: any}>('http://localhost:3000/Waitless/' + this.addInfoService.getRestaurantName() +'/Menu')
      .pipe(map((menuData)=>{
        return menuData.data.map(data =>{
          return {
            itemName: data.itemName,
            description: data.description,
            ingredients: data.ingredients,
            price: data.price,
            calories: data.calories,
            id: data._id,
            imagePath: data.imagePath,
            restaurantId: data.restaurantId,
            tags: data.tags
          };
        });
      }))
      .subscribe((transformedData)=>{
        this.dataList = transformedData;
        this.dataUpdated.next([...this.dataList]);

     });
     // return [...this.dataList];
   }

   getItem(id: string){
     // return{... this.dataList.find(i => i.id === id)};
     return this.http.get<{_id: string, itemName: string, description: string, ingredients: string, price: string, calories: string, imagePath: string, restaurantId: string, tags: string[]}>('http://localhost:3000/Waitless/' + this.addInfoService.getRestaurantName() + '/Create_Menu/Edit/'+ id);
   }

   // getItem(id: string){
   //   return{... this.dataList.find(i => i.id === id)};
   //   // return this.http.get<{_id: string, itemName: string, description: string, ingredients: string, price: number, calories: number}>('http://localhost:3000/Waitless/Create_Menu/Edit/'+ id);
   // }

   addData(itemName: string, description: string, ingredients: string, price: string, calories: string, image: File, tags: string[]){
     // const data: Menu = {itemName: itemName, description: description, ingredients: ingredients, price: price, calories: calories, id: null}
     const data = new FormData();
     data.append("itemName", itemName);
     data.append("description", description);
     data.append("ingredients", ingredients);
     data.append("price", price);
     data.append("calories", calories);
     data.append("image", image, itemName);
     data.append("tags",JSON.stringify(tags));

     this.http
      .post<{message:string, dataId: string, imageP: string}>('http://localhost:3000/Waitless/' + this.addInfoService.getRestaurantName() +'/Create_Menu', data)
       .subscribe(responseData =>{
         const data =  {id: responseData.dataId, itemName: itemName, description: description, ingredients: ingredients, price: price, calories: calories, imagePath: responseData.imageP, restaurantId: null, tags: tags }
         // const id = responseData.dataId;
         // console.log(responseData.message);
         // data.id = id;
         this.dataList.push(data)
         this.dataUpdated.next([...this.dataList]);
      });
   }

   getAddDataListener(){
     return this.dataUpdated.asObservable();
   }

   deleteItem(dataId: string){
     this.http.delete("http://localhost:3000/Waitless/" + this.addInfoService.getRestaurantName() +"/Create_Menu/" + dataId)
      .subscribe(() => {
        console.log('Deleted!');
        const updatedMenuData = this.dataList.filter(data => data.id !== dataId);
        this.dataList = updatedMenuData;
        this.dataUpdated.next([...this.dataList]);
      });
   }

   updateItem(dataId: string, itemName: string, description: string, ingredients: string, price: string, calories: string, image: File | string, tags:string[] ){
     let menuData: any;
     if (typeof image === 'object'){
       menuData = new FormData();
       menuData.append("id", dataId);
       menuData.append('itemName', itemName);
       menuData.append('description', description);
       menuData.append('ingredients', ingredients);
       menuData.append('price', price);
       menuData.append('calories', calories);
       menuData.append('image', image, itemName);
       menuData.append('tags', tags);
     }else{
       menuData = {id: dataId, itemName: itemName, description: description, ingredients: ingredients, price: price, calories: calories, imagePath: image, restaurantId: null, tags: tags };
     }
      // const menuData: Menu = {id: dataId, itemName: itemName, description: description, ingredients: ingredients, price: price, calories: calories, imagePath: null};
      this.http.put('http://localhost:3000/Waitless/' + this.addInfoService.getRestaurantName() +'/Create_Menu/Edit/' + dataId, menuData).subscribe(response => {
          const updatedItem = [...this.dataList];
          const oldItemIndex = updatedItem.findIndex(i => i.id === dataId);
          const data: Menu = {itemName: itemName, description: description, ingredients: ingredients, price: price, calories: calories, id: dataId, imagePath: "", restaurantId: null, tags: tags};
          updatedItem[oldItemIndex] = data;
          this.dataList = updatedItem;
          this.dataUpdated.next([...this.dataList]);
        });
   }

}
