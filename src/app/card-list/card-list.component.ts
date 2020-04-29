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
  styleUrls: ['./card-list.component.scss'],
  animations:[
    trigger('loadedImages', [
      transition('* => *', [
        query('img', style({ opacity: '0', transform: 'translateY(25px)'}), { optional: true }),
        query('img', 
          stagger('50ms', [
            animate('50ms', style({ opacity: '1', transform: 'translateY(0)'}))
          ]), { optional: true })
      ])
    ])
  ]
})
export class CardListComponent implements OnInit {
  @Input() cardList: Array<Card>
  @Input() setInfo: SetInfo;
  @Output() setCardInfoEvent = new EventEmitter<Card>();
  backSide: string = '../../../../assets/images/back_high.jpg'
  constructor() { }

  ngOnInit(): void {
  }
    
  setCardInfo(card: Card): void {
    this.setCardInfoEvent.emit(card)
  }

}
