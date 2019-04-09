import {Injectable} from '@angular/core';
import {Typhoon} from './typhoon';
import {TyphoonList} from './typhoonDataMock';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TyphoonService {

  constructor() {
  }

  getTyphoonList(): Observable<Typhoon[]> {
    return of(TyphoonList);
  }

  // filterTyphoon(top)
}
