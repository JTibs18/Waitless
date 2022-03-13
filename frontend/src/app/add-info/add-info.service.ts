import { Rdata } from './rData.model'
import { AuthData } from './auth-Data.model'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AddInfoService{
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
  private userId: string;
  private restaurantName: string;

   private dataList: Rdata[] = [];
   private dataUpdated = new Subject<any[]>();

   constructor(private http: HttpClient, private router: Router ){}

   getToken(){
     return this.token;
   }

   getAuthStatiusListener(){
     return this.authStatusListener.asObservable();
   }

   getIsAuth(){
     return this.isAuthenticated;
   }

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
       this.http.post<{token:string, expiresIn: number, dataId: string, userId: string, restaurantName: string}>('http://localhost:3000/Waitless/Registration', data)
       .subscribe(responseData =>{
         const id = responseData.dataId;
         data.id = id;
         this.dataList.push(data)
         this.dataUpdated.next([...this.dataList]);

         const token = responseData.token;
         this.token = token;
         if (token){
           const expiresInDuration = responseData.expiresIn;
           this.setAuthTimer(expiresInDuration);
           this.authStatusListener.next(true);
           this.isAuthenticated = true;
           this.userId = responseData.userId;
           this.restaurantName = responseData.restaurantName;
           const now = new Date();
           const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
           this.saveAuthData(token, expirationDate, this.userId, this.restaurantName)
           this.router.navigate(['Waitless/' + this.restaurantName +'/Create_Menu']) //need to check db for actual restuarant name
         }
       });

   }

   getAddDataListener(){
     return this.dataUpdated.asObservable();
   }

   login(email: string, password: string){
    const authData: AuthData = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number, userId: string, restaurantName: string}>("http://localhost:3000/Waitless/login/", authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token){
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.authStatusListener.next(true);
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.restaurantName = response.restaurantName;
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate, this.userId, this.restaurantName)
        this.router.navigate(['Waitless/' + this.restaurantName + '/Dashboard']) //need to check db for actual restuarant name
      }

    });
   }

   autoAuthUser(){
     const authInformation = this.getAuthData();
     if (!authInformation){
       return;
     }
     const now = new Date();
     const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
     if (expiresIn > 0){
       this.token = authInformation.token;
       this.isAuthenticated = true;
       this.userId = authInformation.userId;
       this.restaurantName = authInformation.restaurantName;
       this.setAuthTimer(expiresIn / 1000);
       this.authStatusListener.next(true);
     }
   }

   logout(){
     this.token = null;
     this.isAuthenticated = false;
     this.authStatusListener.next(false);
     clearTimeout(this.tokenTimer);
     this.clearAuthData();
     this.userId = null;
     this.restaurantName = null;
     this.router.navigate(['/Waitless']);
   }

   private saveAuthData(token: string, expirationDate: Date, userId: string, restaurantName: string){
     localStorage.setItem('token', token);
     localStorage.setItem('expiration', expirationDate.toISOString());
     localStorage.setItem('userId', userId);
     localStorage.setItem('restaurantName', restaurantName);
   }

   private clearAuthData(){
     localStorage.removeItem("token");
     localStorage.removeItem("expiration");
     localStorage.removeItem("userId");
     localStorage.removeItem("restaurantName");
   }

   private getAuthData(){
     const token = localStorage.getItem("token");
     const expirationDate = localStorage.getItem("expiration");
     const userId = localStorage.getItem("userId");
     const restaurantName = localStorage.getItem("restaurantName");

     if (!token || !expirationDate){
       return;
     }
     return{
       token: token,
       expirationDate: new Date(expirationDate),
       userId: userId,
       restaurantName: restaurantName
     }
   }

   getUserId(){
     return this.userId;
   }

   getRestaurantName(){
    return this.restaurantName;
   }

   private setAuthTimer(duration: number){
     this.tokenTimer = setTimeout(()=>{
       this.logout();
     }, duration * 1000); //adjust multiplier for mili seconds. Maybe set it to 6 hours?
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
