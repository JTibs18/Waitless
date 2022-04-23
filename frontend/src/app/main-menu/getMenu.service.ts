import { Menu } from '../create-menu/menu.model';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";


@Injectable({providedIn: 'root'})
export class GetMenuService{
   private dataList: any[] = [];
   private dataUpdated = new Subject<any[]>();

   private dietaryRestrictions = new BehaviorSubject([]);
   curTags = this.dietaryRestrictions.asObservable();

   private mainMenuFirst = true;

   currentOID: string;

   // private order: any[] = [];
   // private orderUpdated = new Subject<any[]>();

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

   //NOT USED CURRENTLY
   getMenuItem(restaurantId, menuId){
     // return{... this.dataList.find(i => i.id === id)};
     return this.http.get<{_id: string, itemName: string, description: string, ingredients: string, price: string, calories: string, imagePath: string, restaurantId: string, tags: string[]}>('http://localhost:3000/Waitless/' + restaurantId + '/focusOneItem/' +  menuId);
   }

   getItem(restaurantId, menuId){
     for (let i = 0; i < this.dataList.length; i++){
       if(this.dataList[i].id == menuId){
         return this.dataList[i]
       }
     }
   }

   updateDietaryRestrictions(dietaryRestriction: any){
     this.dietaryRestrictions.next(dietaryRestriction)
   }

    getAddDataListener(){
        return this.dataUpdated.asObservable();
    }

    updateItemOrder(dataId: string, dietaryRestriction:string[], quantity: Number ){
      const updatedItem = [...this.dataList];
      const oldItemIndex = updatedItem.findIndex(i => i.id === dataId);
      const data = {itemName: this.dataList[oldItemIndex].itemName, description: this.dataList[oldItemIndex].description, ingredients: this.dataList[oldItemIndex].ingredients, price: this.dataList[oldItemIndex].price, calories: this.dataList[oldItemIndex].calories, id: dataId, imagePath: this.dataList[oldItemIndex].imagePath, restaurantId: this.dataList[oldItemIndex].restaurantId, tags: this.dataList[oldItemIndex].tags, quantity: quantity, dietaryRestrictions: dietaryRestriction};

      // const order = {itemName: this.dataList[oldItemIndex].itemName, price: this.dataList[oldItemIndex].price, id: dataId, restaurantId: this.dataList[oldItemIndex].restaurantId, tags: tags, quantity: quantity};

       updatedItem[oldItemIndex] = data;
       this.dataList = updatedItem;
       this.dataUpdated.next([...this.dataList]);
       console.log("INTEREST",  this.dataList)

    }

    mainMenu(){
      this.mainMenuFirst = false
    }

    mainMenuReset(){
      this.mainMenuFirst = true
    }

    getMainMenuFirst(){
      return this.mainMenuFirst
    }

    getModifiedMenu(){
      return this.dataList
    }

    getOrderSummary(){
      var order = [];

      for (let i = 0; i < this.dataList.length; i++){
        if(this.dataList[i].quantity && this.dataList[i].quantity > 0 ){
          order.push(this.dataList[i])
        }
      }
      return order
    }

    setOID(oid: string){
      this.currentOID = oid
    }

    getOID(){
      return this.currentOID
    } 
 }
