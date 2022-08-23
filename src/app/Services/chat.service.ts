import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import io, { Socket } from "socket.io-client";


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public user$: BehaviorSubject<string> = new BehaviorSubject('');
  public socket: Socket;
  public socketId: string = ''
  //public socketId$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {
    this.socket = io('https://139.59.33.251:3000');
    this.socket.on('Id', (id)=>{
      this.socketId = id; 
    });
  }

  //socket = io.connect('http://localhost:3000');

  public sendMessage(message: any, receivingUser: any, sendingUser: any) {
    this.socket.emit('message',{message: message, receivingUser: receivingUser, sendingUser: sendingUser, senderId : this.socketId});
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