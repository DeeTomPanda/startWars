import { Injectable } from '@angular/core';
import { Observable, timer, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {
    timer(30 * 1000 * 60).pipe(
      switchMap((_) => {
        console.log(_);
        this.hashMap.clear();
        return of(null);
      })
    );
  }
  private hashMap: Map<string, any> = new Map();

  public get(key: string): undefined | any {
    let result = this.hashMap.get(key);
    return result;
  }

  public set(key: string, value: any): void {
    this.hashMap.set(key, value);
  }
}
