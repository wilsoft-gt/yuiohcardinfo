import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/models/yugioh.models';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit {
  @Input() card: Card;
  backSide: string = '../../../../assets/images/back_high.jpg'
  constructor() { }

  ngOnInit(): void {
  }
  
  setCardImage(target: HTMLImageElement, link): void {
    target.src = link
  }

}
