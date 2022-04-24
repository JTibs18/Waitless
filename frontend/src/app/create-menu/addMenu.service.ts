import { Menu } from './menu.model'
import { OrderModel } from '../order-summary/orderModel'

import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { AddInfoService } from "../add-info/add-info.service";
import { WebsocketService } from '../order-summary/websocket-service.service';


@Injectable({providedIn: 'root'})
export class AddMenuService{
   private dataList: Menu[] = [];
   private dataUpdated = new Subject<any[]>();

   private orderList: any[] = [];
   private orderUpdated = new Subject<any[]>();

   private pastOrderList: any[] = [];
   private pastOrderUpdated = new Subject<any[]>();

   private currentOID: any;

   constructor(private http: HttpClient, private addInfoService: AddInfoService, private websocketService: WebsocketService,){
     this.websocketService.getNewOrder().subscribe((order: any) => {
     // this.orderList.push(order);
     console.log("ORDER", order)
     this.addOrder(order.tableNum, order.order, order.specialNotes, order.tab, order.restaurantId)

   });
   }

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

   getPastOrders(){
     this.http
      .get<{message: string, data: any}>('http://localhost:3000/Waitless/' + this.addInfoService.getRestaurantName() +'/PastOrder')
      .pipe(map((orderData)=>{
        return orderData.data.map(data =>{
          return {
              id: data._id,
              tableNum: data.tableNum,
              order: data.order,
              specialNotes: data.specialNotes,
              tab: data.tab,
              restaurantId: data.restaurantId,
              status: data.status,
              timeCompleted: data.timeCompleted
          };
        });
      }))
      .subscribe((transformedData)=>{
        console.log("OD", transformedData)
        this.pastOrderList = transformedData;
        this.pastOrderUpdated.next([...this.pastOrderList]);

     });
     // return [...this.dataList];
   }

   // getCurOrder(){
   //   this.http
   //    .get<{message: string, data: any}>('http://localhost:3000/Waitless/' + this.addInfoService.getRestaurantName() +'/curOrders')
   //    .pipe(map((orderData)=>{
   //      return orderData.data.map(data =>{
   //        return {
   //          id: data._id,
   //          tableNum: data.tableNum,
   //          order: data.order,
   //          specialNotes: data.specialNotes,
   //          tab: data.tab,
   //          restaurantId: data.restaurantId,
   //          status: data.status
   //        };
   //      });
   //    }))
   //    .subscribe((transformedData)=>{
   //      console.log("OD", transformedData)
   //      this.orderList = transformedData;
   //      this.orderUpdated.next([...this.orderList]);
   //
   //   });
   //   // return [...this.dataList];
   // }

   getItem(id: string){
     // return{... this.dataList.find(i => i.id === id)};
     return this.http.get<{_id: string, itemName: string, description: string, ingredients: string, price: string, calories: string, imagePath: string, restaurantId: string, tags: string[]}>('http://localhost:3000/Waitless/' + this.addInfoService.getRestaurantName() + '/Create_Menu/Edit/'+ id);
   }

   getPastOrder(orderId){
     for (let i = 0; i < this.pastOrderList.length; i++){
       if(this.pastOrderList[i].id == orderId){
         return this.pastOrderList[i]
       }
     }
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

   getAddPastOrderListener(){
     return this.pastOrderUpdated.asObservable();
   }

   getAddCurOrderListener(){
     return this.orderUpdated.asObservable();
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

   addOrder(tableNum: string, order: any[], specialNotes: string, tab:Number, restaurantId:string ){
     let orderData: any;

    if(order && Number(order) != -1){
      orderData = {
        tableNum: tableNum,
        order: order,
        specialNotes: specialNotes,
        tab: tab,
        restaurantId: restaurantId,
        status: "New"
      }

      this.http
       .post<{message:string, orderId: string}>('http://localhost:3000/Waitless/' + this.addInfoService.getRestaurantName() +'/Dashboard', orderData)
        .subscribe(responseData =>{
          const response =  {id: responseData.orderId, tableNum: tableNum, order: order, specialNotes: specialNotes, tab: tab, status: "New"}

          this.currentOID = {id: response.id, table: response.tableNum}
          this.sendRec(this.currentOID);
          this.orderList.push(response)
          this.orderUpdated.next([...this.orderList]);
          console.log("O", this.orderList)
       });
    }

   }

   addPastOrder(id: string, tableNum: string, order: any[], specialNotes: string, tab:Number, restaurantId:string, status: string, timeCompleted: string ){
     let pastOrderData: any;
      pastOrderData = {
        id: id,
        tableNum: tableNum,
        order: order,
        specialNotes: specialNotes,
        tab: tab,
        restaurantId: restaurantId,
        status: status,
        timeCompleted: timeCompleted
      }

      console.log("ERE", pastOrderData)
      this.http
       .post<{message:string}>('http://localhost:3000/Waitless/' + this.addInfoService.getRestaurantName() +'/PastOrder', pastOrderData)
       .subscribe(responseData =>{
         console.log(responseData)
         this.pastOrderList.push(pastOrderData)
         this.pastOrderUpdated.next([...this.pastOrderList]);

      });
   }

   getCurOrder(){
     return this.orderUpdated
   }

   initCurOrder(){
     return this.orderList
   }

   getCurrentOID(){
     return this.currentOID
   }

   updateOrderList(orderList: any){
     this.orderList = orderList ;
     this.orderUpdated.next(orderList);
   }

   updatePastOrderList(pastList: any){
     this.pastOrderList = pastList ;
     this.pastOrderUpdated.next(pastList);
   }

   sendRec(data) {
     this.websocketService.sendRec(data);
   }

   sendConf() {
     this.websocketService.sendOrder(-1);
   }






}
