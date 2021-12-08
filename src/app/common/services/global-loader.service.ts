import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalLoaderService {
  private progressbarSource = new BehaviorSubject<boolean>(false);
  progressbar$ = this.progressbarSource.asObservable();

  showProgressbar(): void {
    this.progressbarSource.next(true);
  }

  hideProgressbar(): void {
    this.progressbarSource.next(false);
  }
}
