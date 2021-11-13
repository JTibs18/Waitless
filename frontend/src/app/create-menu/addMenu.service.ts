import { Menu } from './menu.model'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class AddMenuService{
   private dataList: Menu[] = [];
   private dataUpdated = new Subject<any[]>();

   getData(){
     return [...this.dataList]
   }

   addData(itemName: string, description: string, ingredients: string, price: number, calories: number){
     const data: Menu = {itemName: itemName, description: description, ingredients: ingredients, price: price, calories: calories}
       this.dataList.push(data)
       this.dataUpdated.next([...this.dataList]);
   }

   getAddDataListener(){
     return this.dataUpdated.asObservable();
   }
}
