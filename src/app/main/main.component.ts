import { Component, OnInit } from '@angular/core';
import { RequestDataService } from '../services/request-data.service';
import { Card, SetInfo } from '../../models/yugioh.models'
import * as _ from 'lodash';
import { select } from '@ngrx/store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  allSetsInfo: Array<SetInfo>;
  selectedSet: Array<Card>;
  selectedSetInfo: SetInfo;
  
  selectedCard: Card;
  
  constructor(
    private requestData: RequestDataService
  ) { }

  ngOnInit(): void {
    this.requestSetData()
  }
  
  async requestSetData(): Promise<any>{
    const response = await this.requestData.getCardSets();
    this.allSetsInfo = response
    this.randomSet()
  }
  
  get allSetsName(): Array<string> {
    return this.allSetsInfo.map(set => set.set_name)
  }
  
  async randomSet(): Promise<any> {
    const setName = _.sample(this.allSetsName)
    const setInfo = this.allSetsInfo.filter((set: SetInfo) => set.set_name == setName)
    this.selectedSetInfo = setInfo[0]
    const response = await this.requestData.getSingleSet(setName);
    this.selectedSet = response.data
    this.selectedCard = _.sample(this.selectedSet)
    console.log(this.selectedCard)
  }
  
  setCardInfo(selected: Card): void {
    this.selectedCard = selected
  }
  
}
