import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(`https://swapi.dev/api/planets/?format=json`).pipe(
      tap((data) => {
        console.log(data);
      }),
      catchError((error) => {
        console.error('Error fetching data:', error);
        throw error;
      })
    );
  }
}
