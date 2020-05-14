import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card, Filter } from 'src/models/yugioh.models';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import * as filters from '../../models/constantes';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() allCards: Array<Card>;
  @Output() filterEvent = new EventEmitter<Filter>();
  @Output() openSetsEvent = new EventEmitter();
  formInput = new FormControl();
  filteredOptions: Observable<any>;
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

  ngOnInit(): void {}
  
  typeImage(type: string): string {
    return `../../assets/images/types/${type}.svg`
  }
  
  filterCards(filter: string, type: string, card?: string): void {
    const filters: Filter = { filter: filter, value: type, spellOrTrap: card }
    this.filterEvent.emit(filters)
  }
  
  openSetDialog(): void {
    this.openSetsEvent.emit()
  }

}
