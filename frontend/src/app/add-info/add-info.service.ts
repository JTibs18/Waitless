import { Rdata } from './rData.model'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AddInfoService{
   private dataList: Rdata[] = [];
   private dataUpdated = new Subject<any[]>();

   constructor(private http: HttpClient){}

   getData(){
     this.http
      .get<{message: string, data: any}>('http://localhost:3000/Waitless/Registration')
      .pipe(map((regData)=>{
        return regData.data.map(data =>{
          return {
            name: data.name,
            location: data.location,
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: data.password,
            password2: data.password2,
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

   addData(name: string, location: string, email: string, phoneNumber: number, password: string, password2: string){
     const data: Rdata = {name: name, location: location, email: email, phoneNumber: phoneNumber, password: password, password2: password2, id: null}
       this.http.post<{message:string, dataId: string}>('http://localhost:3000/Waitless/Registration', data)
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

   //Just an example. Will be deleted later (reserved only for settings through dashboard)
   deleteProfile(dataId: string){
     this.http.delete("http://localhost:3000/Waitless/Registration/" + dataId)
      .subscribe(() => {
        console.log('Deleted!');
        const updatedRegData = this.dataList.filter(data => data.id !== dataId);
        this.dataList = updatedRegData;
        this.dataUpdated.next([...this.dataList]);
      });
   }

}
