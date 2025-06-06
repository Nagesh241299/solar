import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor() {
  }

  private emitChangeSource = new Subject<boolean>();
  changeEmitted = this.emitChangeSource.asObservable();
  emitChange(change: boolean){
    this.emitChangeSource.next(change);
  }

  //Sidebar Notification
  private emitSidebarNofitSource = new Subject<boolean>();
  SidebarNotifyChangeEmitted = this.emitSidebarNofitSource.asObservable();
  emitSidebarNotifyChange(change: boolean){
    this.emitSidebarNofitSource.next(change);
  }

   //Switcher
   private emitSwitcherSource = new Subject<boolean>();
   SwitcherChangeEmitted = this.emitSwitcherSource.asObservable();
   emitSwitcherChange(change: boolean){
     this.emitSwitcherSource.next(change);
   }
}
