import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { IGame } from '../game';
import { IImageCard } from '../imageCard';
import { IGameInfo } from '../gameInfo';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  isReady:boolean;
  gameSettings:IGame;
  cards:IImageCard[];
  moves: number;
  startTime:number;
  endTime:number;
  isFinished:boolean;
  endText:string;
  showPlayAgain:boolean;

  constructor(private gameService:GameService) { }

  ngOnInit(): void {
    this.initGame();
  }
  initGame=():void=>{
    this.moves=0;
    this.cards=[];
    this.isReady=false;
    this.isFinished=false;
    this.showPlayAgain=false;
    this.getGameSettings();
  }
  getGameSettings=():void=>{
    this.gameService.getGameSettings()
    .subscribe((game)=>{
      this.gameSettings=<IGame>game.data;
      this.shuffleBoard();
      this.isReady=true;
      this.startTime= Math.round((new Date()).getTime() / 1000);  
    })
  }
  shuffleBoard=():void=>{
    this.gameSettings.images.sort(() => Math.random() - 0.5);
  }
  checkPair=(card)=>{
    if(this.cards.length===0) {
      this.cards.push(card);
    }
    else{
      this.cards.push(card);
      this.checkMatch();
    }
  }
  checkMatch=()=>{
    const [card1,card2] = this.cards;
    if(card1.id===card2.pair_id){
      this.changeCards(true);
      this.moves++;
      this.checkIfDone();
    }
    else{
      window.setTimeout(()=>{
        this.changeCards(false);
      },500)
    }
  }
  changeCards(value){
    this.cards.map((card)=>{
      card.isPaired=value;
      card.isFlipped=value;
    })
    this.cards.length=0;
  }
  checkIfDone=()=>{
    if (this.gameSettings.images.length/this.moves===2) {
      this.isFinished=true;
    }
  }
  endGame=(value)=>{
    this.endText=value;
    this.endTime=Math.round((new Date()).getTime() / 1000)-1;
    this.showPlayAgain=true;
    this.postGame();
  }
  postGame=()=>{
    const game:IGameInfo = {
      user_id:+this.gameSettings.user_id,
      time:this.startTime,
      matches:this.endTime
    }

    this.gameService.addNewGameInfo(game)
    .subscribe((res)=>console.log(res))
  }
}
