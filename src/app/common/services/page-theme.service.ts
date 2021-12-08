import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageThemeService {
  private themeChangedSource = new BehaviorSubject<boolean>(false);
  themeChanged$ = this.themeChangedSource.asObservable();

  constructor() { }

  private activateDarkTheme(): void {
    localStorage.setItem('darkThemeEnabled', 'active');
    document.body.classList.add('dark-theme');
    this.themeChangedSource.next(true);
  }

  private deactivateDarkTheme(): void {
    localStorage.removeItem('darkThemeEnabled');
    document.body.classList.remove('dark-theme');
    this.themeChangedSource.next(false);
  }

  applyPageThemeOnStartup(): void {
    const storageKey = localStorage.getItem('darkThemeEnabled');
    
    if (!!storageKey) this.activateDarkTheme();
  }
  
  changeTheme(): void {
    const storageKey = localStorage.getItem('darkThemeEnabled');
    !storageKey ? this.activateDarkTheme() : this.deactivateDarkTheme();
  }
}
