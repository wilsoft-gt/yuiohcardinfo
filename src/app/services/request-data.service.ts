import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Filter } from '../../models/yugioh.models'

@Injectable({
  providedIn: 'root'
})
export class RequestDataService {
  allCards: string = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
  cardSets: string = 'https://db.ygoprodeck.com/api/v7/cardsets.php';
  cardsInSet: string = '?set=';
  constructor(
    private httpClient: HttpClient
  ) { }

  async getAllData(): Promise<any> {
    const response = await this.httpClient.get(this.allCards).toPromise()
    return response
  }

  async getCardSets(): Promise<any> {
    const response = await this.httpClient.get(this.cardSets).toPromise()
    return response
  }

  async getSingleSet(setName): Promise<any> {
    const response = await this.httpClient.get(`${this.allCards}${this.cardsInSet}${setName}`).toPromise()
    return response
  }
  
  async getFiltered(filtered: Filter): Promise<any> {
    if (filtered.filter && filtered.spellOrTrap){
      const response = await this.httpClient.get(`${this.allCards}?type=${filtered.spellOrTrap}&${filtered.filter}=${filtered.value}`).toPromise();
      return response
    }
    const response = await this.httpClient.get(`${this.allCards}?${filtered.filter}=${filtered.value}`).toPromise();
    return response    
  }
}
