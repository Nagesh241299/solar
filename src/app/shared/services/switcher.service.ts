import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class SwitcherService {

  constructor() { }
  private emitChangeSource = new Subject<boolean>();
  changeEmitted = this.emitChangeSource.asObservable();
  emitChange(change: boolean){
    this.emitChangeSource.next(change);
  }

  private emitHoverChangeSource = new Subject<boolean>();
  changeHoverEmitted = this.emitHoverChangeSource.asObservable();
  emitHoverChange(change: boolean){
    this.emitHoverChangeSource.next(change);
  }

}
