import { Menu } from '../create-menu/menu.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";


@Injectable({providedIn: 'root'})
export class GetMenuService{
   private dataList: Menu[] = [];
   private dataUpdated = new Subject<any[]>();

   constructor(private http: HttpClient){}



   getMenu(restaurantID){
     this.http
      .get<{message: string, data: any}>('http://localhost:3000/Waitless/' + restaurantID +'/Menu')
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

   getRestaurantName(restaurantID){
     return this.http.get<{restaurantName: string}>('http://localhost:3000/Waitless/' + restaurantID + '/Name');
   }

   getMenuItem(restaurantId, menuId){
     // return{... this.dataList.find(i => i.id === id)};
     return this.http.get<{_id: string, itemName: string, description: string, ingredients: string, price: string, calories: string, imagePath: string, restaurantId: string, tags: string[]}>('http://localhost:3000/Waitless/' + restaurantId + '/focusOneItem/' +  menuId);
   }


      getAddDataListener(){
        return this.dataUpdated.asObservable();
      }

 }
