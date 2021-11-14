import { Menu } from './menu.model'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class AddMenuService{
   private dataList: Menu[] = [];
   private dataUpdated = new Subject<any[]>();

   constructor(private http: HttpClient){}

   getData(){
     this.http
      .get<{message: string, data: any}>('http://localhost:3000/Waitless/Create_Menu')
      .pipe(map((menuData)=>{
        return menuData.data.map(data =>{
          return {
            itemName: data.itemName,
            description: data.description,
            ingredients: data.ingredients,
            price: data.price,
            calories: data.calories,
            id: data._id
          };
        });
      }))
      .subscribe((transformedData)=>{
        this.dataList = transformedData;
        this.dataUpdated.next([...this.dataList]);

     });
     // return [...this.dataList];
   }

   addData(itemName: string, description: string, ingredients: string, price: number, calories: number){
     const data: Menu = {itemName: itemName, description: description, ingredients: ingredients, price: price, calories: calories, id: null}
     this.http.post<{message:string, dataId: string}>('http://localhost:3000/Waitless/Create_Menu', data)
     .subscribe(responseData =>{
       const id = responseData.dataId;
       console.log(responseData.message);
       data.id = id;
       this.dataList.push(data)
       this.dataUpdated.next([...this.dataList]);
     });
   }

   getAddDataListener(){
     return this.dataUpdated.asObservable();
   }

   deleteItem(dataId: string){
     this.http.delete("http://localhost:3000/Waitless/Create_Menu/" + dataId)
      .subscribe(() => {
        console.log('Deleted!');
        const updatedRegData = this.dataList.filter(data => data.id !== dataId);
        this.dataList = updatedRegData;
        this.dataUpdated.next([...this.dataList]);
      });
   }

   // deleteItem()
}
