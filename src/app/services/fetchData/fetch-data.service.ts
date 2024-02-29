import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { map, switchMap, concatMap } from 'rxjs/operators';
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

  getPlanets(): Observable<any> {
    let result: Observable<any> | undefined = this.cache.get(this.URL);
    if (result) {
      return of(result);
    }
    return this.http.get<API>(this.URL).pipe(
      map((data: Record<string, any>) => {
        const results: any[] = data['results'];
        console.log('At map');

        results.forEach((planet) => {
          planet['residents'] = planet['residents'].map(
            (residentURL: string) => {
              const residentNo = residentURL.match(/\d+/);
              return residentNo ? residentNo[0] : null;
            }
          );
        });
        data['results'] = results;
        return data;
      }),
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

  getAllCitizens(): Observable<Array<Record<string, any>>> {
    const url = 'https://swapi.dev/api/people/';
    let cached = this.cache.get(url);
    if (cached) {
      return cached;
    }
    let allCitizens: Array<Record<string, any>> = [];

    return this.getCitizens(url, allCitizens).pipe(
      tap((results) => {
        this.cache.set(url, results);
      })
    );
  }
  getCitizens(
    url: string,
    allCitizens: Array<Record<string, any>>
  ): Observable<any> {
    return this.http.get(url).pipe(
      concatMap((data: Record<string, any>) => {
        allCitizens = [...allCitizens, ...data['results']];
        return data['next']
          ? this.getCitizens(data['next'], allCitizens)
          : of(allCitizens);
      }),

      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
