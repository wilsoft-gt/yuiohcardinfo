import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card, Filter } from 'src/models/yugioh.models';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as filters from '../../models/constantes';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  
  selectedCardName: string;
  
  @Input() allCards: Array<Card>;
  @Output() filterEvent = new EventEmitter<Filter>();
  @Output() openSetsEvent = new EventEmitter();
  @Output() selectedCardEvent = new EventEmitter<Card>();
  
  small: boolean = false;
  
  formInput = new FormControl();
  filteredOptions: Observable<Card[]>;
  
  monsterRaces: Array<string> = filters.MONSTERRACES;
  spellRaces: Array<string> = filters.SPELLRACES;
  trapRaces: Array<string> = filters.TRAPRACES;
  types: Array<string> = filters.TYPES;
  extraDeckTypes: Array<string> = filters.EXTRADECKTYPES;
  atkDefRanges: Array<string> = filters.ATKDEFRANGES;
  attributes: Array<string> = filters.ATTRIBUTES;
  levels: Array<string> = filters.LEVELS
  linkValues: Array<string> = filters.LINKVALUES;
  pendulumScales: Array<string> = filters.PENDULUMSCALE
  
  constructor() {}

  ngOnInit() {
    this.filteredOptions = this.formInput.valueChanges.pipe(
      map(value => {
        if (value.length > 4){
          return this.filterSearch(value)
        }
      })
    )
  }
  
  ngOnChanges() {
    
  }
  
  get isInputMoreThanTree(): boolean {
    return (this.formInput.value > 2)
  }
  
  filterCards(filter: string, type: string, card?: string): void {
    this.small = false
    this.clearFn()
    const filters: Filter = { filter: filter, value: type, spellOrTrap: card }
    this.filterEvent.emit(filters)
  }
  
  openSetDialog(): void {
    this.openSetsEvent.emit()
  }
  
  filterSearch(value: string): Array<Card> {
    return this.allCards.filter(card => {
      return card.name.toLowerCase().includes(value.toLowerCase())
    })
  }
  
  selectedCard(card: Card) {
    this.selectedCardEvent.emit(card)
    this.small = false
  }
  
  displayFn(card: Card): string {
    return card ? card.name : ''
  }
  
  clearFn(): void {
    this.formInput.setValue('')
  }
  
}
