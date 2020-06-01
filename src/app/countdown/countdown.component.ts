import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  
  seconds:number;
  minutes:number;
  countdown:string;
  x:any;
  @Input() time:number;
  @Input() isFinished:boolean;
  @Output() endGameEvent = new EventEmitter();

  constructor() { }
  ngOnInit(): void {
    this.initTimer();
  }
  initTimer=()=>{
    this.minutes = Math.floor(this.time/60);
    this.seconds = this.time - (this.minutes*60);
    this.formatTime();
    this.x = setInterval(()=>{
      this.updateTime();
    },1000)
  }
  updateTime=()=>{
    if((this.minutes==0 && this.seconds==0) || this.isFinished){
      this.end();
    }
    else if (this.seconds>0) {
      this.seconds--;
    }
    else{
      this.seconds=59;
      this.minutes--;
    }
    this.formatTime();
  }
  formatTime=()=>{
    if (this.minutes<10) {
      this.countdown = `0${this.minutes}:`;
    }
    else this.countdown = `${this.minutes}:`;
    if(this.seconds<10){
      this.countdown += `0${this.seconds}`;
    }
    else this.countdown+=`${this.seconds}`;
  }
  end=()=>{
    clearInterval(this.x)
    const message = this.isFinished?"Great Game!":"Time's Up!";
    this.endGameEvent.emit(message)
  }
}
