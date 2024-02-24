import { Component, OnInit } from '@angular/core';
import { FetchDataService } from './services/fetchData/fetch-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private HTTP: FetchDataService) {}

  ngOnInit(): void {
    this.HTTP.getData().subscribe((data) => console.log(data));
  }
}
