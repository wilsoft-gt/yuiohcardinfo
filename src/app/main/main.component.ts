import { Component, OnInit } from '@angular/core';
import { RequestDataService } from '../services/request-data.service';
import { Card, SetInfo, Filter } from '../../models/yugioh.models'
import { MatDialog } from '@angular/material/dialog'
import * as _ from 'lodash';
import { SetsComponent } from '../sets/sets.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  viewing: string;
  allSetsInfo: Array<SetInfo>;
  selectedSet: Array<Card>;
  selectedSetInfo: SetInfo;
  
  allCards: Array<Card>
  selectedCard: Card;
  
  constructor(
    private requestData: RequestDataService,
    private cardSetsDialog: MatDialog
  ) { }
  
  openDialog(): void {
    const cardSetsDialogRef = this.cardSetsDialog.open(
      SetsComponent,
      {
        data: this.allSetsInfo,
        width: '75%'
      });
    cardSetsDialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result != "" && result != undefined) {
        const results = result.split(",")
        this.viewing = results[1]
        const selectedSet: Filter = {filter: "set", value: results[0]}
        this.requestFiltered(selectedSet)
      }
    })
  }

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
    this.viewing = `Viewing set: ${setName}`
    const setInfo = this.allSetsInfo.filter((set: SetInfo) => set.set_name == setName)
    this.selectedSetInfo = setInfo[0]
    const response = await this.requestData.getSingleSet(setName);
    this.selectedSet = response.data
    this.selectedCard = _.sample(this.selectedSet)
  }
  
  setCardInfo(selected: Card): void {
    this.selectedCard = selected
  }
  
  async requestAllCards(): Promise<void> {
    const cards = await this.requestData.getAllData()
    this.allCards = cards.data
  }
  
  async requestFiltered(filter: Filter): Promise<any> {
    this.selectedSet = []
    if (filter.filter != "set"){
      if (filter.spellOrTrap){
        this.viewing = `Filter by ${filter.spellOrTrap} ${filter.filter} ${filter.value}`
      } else {
        this.viewing = `Filter by ${filter.filter} ${filter.value}`
      }
    }
    const response = await this.requestData.getFiltered(filter);
    this.selectedSet = response.data
    this.selectedCard = _.sample(this.selectedSet)
  }
  
}
