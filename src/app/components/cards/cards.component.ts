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
  @Input() data: Array<Record<string, any>> = [];
  @Input() citizens: Array<Record<string, any>> = [];
  isLoaded: boolean = false;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.data.length > 0 && this.citizens.length > 0
      ? (this.isLoaded = true)
      : (this.isLoaded = false);
  }
}
