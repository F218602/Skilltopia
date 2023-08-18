import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { QuizQuestion } from './quizQuestion.interface';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {
  private socket: Socket;
  public Created: boolean = false;
  public roomName: string = 'myRoom';

  constructor() {
    // Connect to the server
    this.socket = io('http://localhost:3000');
  }
  getCreated () {
  return this.Created;
  }

  join(userName: string, roomName: string) {
    this.roomName = roomName;
    this.socket.emit('join', roomName);
  }

  change(roomName: string, i: number, j: number, val: number) {
    this.socket.emit('change', roomName, i, j, val);
  }
  // Quiz question get
  getQuestion() {
    this.socket.emit('getQuestion');
  }


// Listeners
  Joined(): Observable<[number, number[][], number[][]]> {
    return new Observable<[number, number[][], number[][]]>((observer) => {
      this.socket.on('Joined', (playerID: number, arrayData: number[][], tileOwner: number[][]) => {
        observer.next([playerID, arrayData, tileOwner]);
      });
    });
  }
  playerJoined() : Observable<[string]> {
    return new Observable<[string]>((observer) => {
      this.socket.on('playerJoined', (playerId: string) => {
        observer.next([playerId]);
      });
    });
  }
  playerLeft() : Observable<[string]> {
    return new Observable<[string]>((observer) => {
      this.socket.on('playerLeft', (playerId: string) => {
        observer.next([playerId]);
      });
    });
  }
  roomFull() : Observable<[]> {
    return new Observable<[]>((observer) => {
      this.socket.on('roomFull', () => {
        observer.next([]);
      });
    });
  }
  changed() : Observable<[number, number, number]> {
    return new Observable<[number, number, number]>((observer) => {
      this.socket.on('changed', (i: number, j: number, val: number) => {
        observer.next([i, j, val]);
      });
    });
  }
  
  returnQuestion() : Observable<[QuizQuestion]> {
    return new Observable<[QuizQuestion]>((observer) => {
      this.socket.on('returnQuestion', (selectedQuestion: QuizQuestion) => {
        observer.next([selectedQuestion]);
      });
    });
  }
  
}
