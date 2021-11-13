import { Rdata } from './rData.model'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class AddInfoService{
   private dataList: Rdata[] = [];
   private d2: any[]=[];
   private dataUpdated = new Subject<any[]>();

   getData(){
     return [...this.dataList]
   }

   addData(name: string, location: string, email: string, phoneNumber: number, password: string, password2: number){
     const data: Rdata = {name: name, location: location, email: email, phoneNumber: phoneNumber, password: password, password2: password2}
       this.dataList.push(data)
       this.dataUpdated.next([...this.dataList]);
   }

   getAddDataListener(){
     return this.dataUpdated.asObservable();
   }
}
