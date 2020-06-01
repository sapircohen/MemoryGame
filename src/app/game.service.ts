import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGameInfo } from './gameInfo';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private memoryUrl:string = "https://dev-bot.pico.buzz/memory";
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http:HttpClient) { }
  
  getGameSettings=():Observable<any>=>{
    return this.http.get<any>(this.memoryUrl);
  }
  addNewGameInfo=(game:IGameInfo)=>{
    return this.http.post<IGameInfo>(this.memoryUrl,game,this.httpOptions)
  }
}
