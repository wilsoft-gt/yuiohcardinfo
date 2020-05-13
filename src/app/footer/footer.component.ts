import { Component, OnInit, Version } from '@angular/core';
import { version } from '../../../package.json'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  VERSION = version
  constructor() { }

  ngOnInit(): void {
  }

}
