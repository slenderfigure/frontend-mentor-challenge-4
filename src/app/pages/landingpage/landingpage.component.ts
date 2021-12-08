import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CountrySrchResult } from 'src/app/common/models/country-srch.model';
import { SrchQuery } from 'src/app/common/models/search-query.model';
import { CountryService } from 'src/app/common/services/country.service';
import { PageThemeService } from 'src/app/common/services/page-theme.service';
import { REGIONS } from './config/regions.config';

@Component({
  selector: 'flag-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  darkModeActive = false;
  fetchingData = true;
  showFilterList = false;
  countries: CountrySrchResult[] = [];
  regions = REGIONS;
  searchForm!: FormGroup;
  defaultSrchQuery: SrchQuery = { 
    region: 'Americas',
    name: '' 
  };

  constructor(
    private themeService: PageThemeService,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initSearchForm();

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

  private initSearchForm(): void {
    this.searchForm = this.fb.group({ searchKeyword: '' });
  }

  get searchCtrl(): FormControl {
    return <FormControl>this.searchForm.get('searchKeyword');
  }

  private updateFilter(region: string): void {
    this.router.navigate([''], { queryParams: { region } });
    this.showFilterList = false;
  }

  onFilterClicked(e: MouseEvent, region: string): void {
    e.stopImmediatePropagation();
    this.updateFilter(region);
  }

  onFilterEnterKeyPressed(e: KeyboardEvent, region: string): void {
    if (!this.showFilterList || e.key !== 'Enter') return;
    this.updateFilter(region);
  }

  @HostListener('window:click', ['$event'])
  clickedOutside(e: MouseEvent): void {
    if (!this.showFilterList) return;

    const target = <HTMLElement>e.target;

    if (!target.closest('.filter-menu')) this.showFilterList = false;
  }

  @HostListener('window:keyup', ['$event'])
  escapeKeyPressed(e: KeyboardEvent): void {
    if (!this.showFilterList || e.key !== 'Escape') return;
    this.showFilterList = false;
  }

  onSearch(): void {
    this.router.navigate([''], { 
      queryParams: { name: this.searchCtrl.value } 
    });
  }

}
