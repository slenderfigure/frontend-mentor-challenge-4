import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from 'src/app/common/models/country.model';
import { PageThemeService } from 'src/app/common/services/page-theme.service';

@Component({
  selector: 'flag-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  details!: Country;
  darkModeActive = false;

  constructor(
    private themeService: PageThemeService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.themeService.themeChanged$.subscribe({
      next: value => this.darkModeActive = value
    });

    this.route.data.subscribe({
      next: ({ details }) => this.details = <Country>details
    });
  }

  get nativeName(): string {
    const key = Object.keys(this.details.name.nativeName)[0];
    return this.details.name.nativeName[key].official;
  }
  
  get currencies(): string {
    const key = Object.keys(this.details.currencies)[0];
    return this.details.currencies[key].name;
  }

  get languages(): string {
    let languages: string[] = [];

    for (let key of Object.keys(this.details.languages)) {
      languages.push(this.details.languages[key]);
    }
    return languages.join(', ');
  }

  onGoBack(): void {
    this.location.back();
  }

}
