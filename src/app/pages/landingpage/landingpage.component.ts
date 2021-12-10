import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CountrySrchResult } from 'src/app/common/models/country-srch.model';
import { SrchQuery } from 'src/app/common/models/search-query.model';
import { CountryService } from 'src/app/common/services/country.service';
import { PageThemeService } from 'src/app/common/services/page-theme.service';

@Component({
  selector: 'flag-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  darkModeActive = false;
  fetchingData = true;
  countries: CountrySrchResult[] = [];
  defaultSrchQuery: SrchQuery = { 
    region: 'Americas',
    name: '' 
  };

  constructor(
    private themeService: PageThemeService,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.themeService.themeChanged$.subscribe({
      next: value => this.darkModeActive = value
    });

    this.route.queryParamMap.pipe(
      switchMap(params => {
        this.fetchingData = true;
        
        if (params.has('region')) {
          this.defaultSrchQuery.region = <string>params.get('region');
        }
        else if (params.has('name')) {
          this.defaultSrchQuery.name = <string>params.get('name');
        }
        return this.countryService.searchCountries(this.defaultSrchQuery);
      })
    ).subscribe({
      next: countries => {
        this.countries = countries;
        this.fetchingData = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
        this.countries = [];
        this.fetchingData = false;
      }
    });
  }

  updateFilter(region: string): void {
    this.defaultSrchQuery.name = '';
    this.router.navigate([''], { queryParams: { region } });
  }
  
  onSearch(keyword: string): void {
    this.router.navigate([''], { queryParams: { name: keyword } });
  }

}
