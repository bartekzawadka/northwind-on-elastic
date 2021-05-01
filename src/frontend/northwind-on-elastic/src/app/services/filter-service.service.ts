import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {share} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {
  private filterValue = '';
  private filterSubjectSource = new BehaviorSubject<any>(undefined);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public filter = this.filterSubjectSource.asObservable();

  constructor() { }

  getCurrentFilterValue(): string{
    return this.filterValue;
  }

  setCurrentFilterValue(value: string) {
    this.filterValue = value;
    this.filterSubjectSource.next(value);
    //this.filterSubjectSource.next(value);
  }
}
