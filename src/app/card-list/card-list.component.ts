import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card, SetInfo } from '../../models/yugioh.models';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations'

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  @Input() cardList: Array<Card>;
  @Input() setInfo: SetInfo;
  @Input() viewing: string;
  @Output() setCardInfoEvent = new EventEmitter<Card>();
  backSide: string = '../../../../assets/images/back_side.png';
  constructor() { }

  ngOnInit(): void {
  }
    
  setCardInfo(card: Card): void {
    this.setCardInfoEvent.emit(card)
  }

}
