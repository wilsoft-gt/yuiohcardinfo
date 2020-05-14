import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card, Filter } from 'src/models/yugioh.models';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit {
  @Input() card: Card;
  @Output() filterEvent = new EventEmitter<Filter>();
  constructor() { }

  ngOnInit(): void {
  }
  
  setCardImage(target: HTMLImageElement, link): void {
    target.src = link
  }
  
  isCardMonster(type: string): boolean {
    const types = ["Spell Card", "Trap Card"]
    return types.includes(type)
  }
  
  filterCards(value: string): void {
    const payload: Filter = {filter: 'set', value: value}
    this.filterEvent.emit(payload)
  }
  
}
