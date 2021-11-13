import { Rdata } from './rData.model'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class AddInfoService{
   private dataList: Rdata[] = [];
   private dataUpdated = new Subject<any[]>();

   constructor(private http: HttpClient){}

   getData(){
     this.http.get<{message: string, data: Rdata[]}>('http://localhost:3000/Waitless').subscribe((registrationData)=>{
       this.dataList = registrationData.data;
       this.dataUpdated.next([...this.dataList]);
     });
     // return [...this.dataList];
   }

   addData(name: string, location: string, email: string, phoneNumber: number, password: string, password2: string){
     const data: Rdata = {name: name, location: location, email: email, phoneNumber: phoneNumber, password: password, password2: password2}
       this.http.post<{message:string}>('http://localhost:3000/Waitless', data).subscribe((responseData) =>{
         console.log(responseData.message);
         this.dataList.push(data)
         this.dataUpdated.next([...this.dataList]);
       });

   }

   getAddDataListener(){
     return this.dataUpdated.asObservable();
   }
}
