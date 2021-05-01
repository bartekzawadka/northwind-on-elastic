import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {
  private filterSubjectSource = new BehaviorSubject<string>('');
  public filterChanged = this.filterSubjectSource.asObservable();

  constructor() { }

  setCurrentFilterValue(value: string) {
    this.filterSubjectSource.next(value);
  }
}
