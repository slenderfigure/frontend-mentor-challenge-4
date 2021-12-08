import { Component, OnInit } from '@angular/core';
import { PageThemeService } from 'src/app/common/services/page-theme.service';

@Component({
  selector: 'flag-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  darkModeActive = false;

  constructor(private themeService: PageThemeService) { }

  ngOnInit(): void {
    this.themeService.themeChanged$.subscribe({
      next: value => this.darkModeActive = value
    });
  }

  changeTheme(): void {
    this.darkModeActive = !this.darkModeActive;
    this.themeService.changeTheme();
  }

}
