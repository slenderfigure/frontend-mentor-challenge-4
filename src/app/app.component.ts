import { Component, OnInit } from '@angular/core';
import { PageThemeService } from './common/services/page-theme.service';

@Component({
  selector: 'flag-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'RestCountries';

  constructor(private themeService: PageThemeService) {}

  ngOnInit(): void {
    this.themeService.applyPageThemeOnStartup();
  }
}
