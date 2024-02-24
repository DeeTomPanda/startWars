import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CacheService } from '../cacheService/cache.service';

interface API {
  data: any;
}
@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  constructor(private http: HttpClient, private cache: CacheService) {}
  public URL = `https://swapi.dev/api/planets/?format=json`;

  getData(): Observable<any> {
    let result: Observable<any> | undefined = this.cache.get(this.URL);
    if (result) {
      return of(result);
    }
    return this.http.get<API>(this.URL).pipe(
      tap((data) => {
        this.cache.set(this.URL, data);
        console.log(data);
      }),
      catchError((error) => {
        console.error('Error fetching data:', error);
        throw error;
      })
    );
  }
}
