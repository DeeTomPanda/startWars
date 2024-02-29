import { Component, OnInit } from '@angular/core';
import { FetchDataService } from './services/fetchData/fetch-data.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private HTTP: FetchDataService) {}
  results: Array<Record<string, any>> = [];
  citizens: Array<Record<string, any>> = [];

  ngOnInit(): void {
    forkJoin([this.HTTP.getPlanets(), this.HTTP.getAllCitizens()]).subscribe(
      ([planetsData, citizensData]) => {
        this.results = planetsData.results;
        this.citizens = citizensData;

        console.log(this.citizens);
      }
    );
  }
}
