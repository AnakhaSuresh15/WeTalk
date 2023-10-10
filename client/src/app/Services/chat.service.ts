import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import io, { Socket } from "socket.io-client";
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public user$: BehaviorSubject<string> = new BehaviorSubject('');
  public socket: Socket;
  public socketId: string = '';
  //public socketId$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private datepipe: DatePipe) {
    this.socket = io('https://wetalk-cfuy.onrender.com/');
    this.socket.on('Id', (id)=>{
      this.socketId = id; 
    });
  }


  public sendMessage(message: any, receiver: any, sender: any) {
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy hh:mm:ss');
    this.socket.emit('message',{message: message, receiver: receiver, sender: sender, dateStamp: currentDateTime,
      senderId: this.socketId});
  }
  public setUser(selecteduser: string) {
    this.socket.emit('user', {
      selecteduser: selecteduser
    });
  }
  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };
  public getUser = () => {
    this.socket.on('user', (user) =>{
      this.user$.next(user);
    });
    
    return this.user$.asObservable();
  };
  /*public getSocketId = () => {
    this.socket.on('Id', (socketId: string) =>{
      this.senderId = socketId;
    });
    
    return this.socketId$.asObservable();
  };*/
}