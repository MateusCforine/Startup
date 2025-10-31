import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiService {
  readonly unreadChats$ = new BehaviorSubject<number>(0);
  readonly unreadNotifs$ = new BehaviorSubject<number>(0);

  setUnreadChats(n: number) {
    this.unreadChats$.next(Math.max(0, n | 0));
  }
  setUnreadNotifs(n: number) {
    this.unreadNotifs$.next(Math.max(0, n | 0));
  }
}

