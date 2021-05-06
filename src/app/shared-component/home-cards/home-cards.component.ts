import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.css']
})
export class HomeCardsComponent implements OnInit {

  @Input() cardItem;

  constructor() { }

  ngOnInit() {
  }

}
