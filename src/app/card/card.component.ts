import { Component, OnInit, Input,EventEmitter,Output } from '@angular/core';
import { IImageCard } from '../imageCard';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  isFlipped:boolean = false;
  blackCard:string = '../assets/images/grayCard.png'

  @Input() card:IImageCard;
  @Output() checkPairEvent = new EventEmitter();
  @Output() cancelFlipEvent= new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.card.isPaired=false;
    this.card.isFlipped=false;
  }

  flipCard=()=>{
    if (this.card.isPaired) return;
    if(this.card.isFlipped){
      this.card.isFlipped=false;
      this.cancelFlipEvent.emit();
      return;
    }
    this.card.isFlipped=true;
    this.checkPairEvent.emit(this.card)
  }

}
