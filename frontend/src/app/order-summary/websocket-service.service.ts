import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";


@Injectable({
  providedIn: 'root',
})
export class WebsocketService {

  public order$: BehaviorSubject<any> = new BehaviorSubject({});
  public rec$: BehaviorSubject<any> = new BehaviorSubject({});

  constructor() {}

  socket = io('http://localhost:3000');

  public sendOrder(order) {
    this.socket.emit('order', order);
  }

  public getNewOrder = () => {
    this.socket.on('order', (order) =>{
      this.order$.next(order);
    });

    return this.order$.asObservable();
  };

  public sendRec(rec) {
    this.socket.emit('rec', rec);
  }

  public getNewRec = () => {
    this.socket.on('rec', (rec) =>{
      this.rec$.next(rec);
    });

    return this.rec$.asObservable();
  };

  public closeConnection(){
    this.socket.emit('forceDisconnect');
  }
}
