import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit, OnChanges {
  @Input() data!: any;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
