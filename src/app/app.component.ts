import { Component, OnInit } from '@angular/core';
import { FetchDataService } from './services/fetchData/fetch-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private HTTP: FetchDataService) {}
  results: Array<Record<string, any>> = [];
  dummy: Array<number> = new Array(100).fill(0);

  ngOnInit(): void {
    this.HTTP.getData().subscribe((data) => {
      this.results = data.results;
    });
  }
}
