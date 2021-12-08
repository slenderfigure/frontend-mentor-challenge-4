import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Country, Name } from '../models/country.model';
import { environment as env } from 'src/environments/environment';
import { SrchQuery } from '../models/search-query.model';
import { CountrySrchResult } from '../models/country-srch.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountryDetails(code: string): Observable<Country> {
    const url = `${env.API}/alpha/${code}?fields=name,tld,borders,currencies,capital,flags,region,population,subregion,languages`;

    return this.http.get<Country>(url).pipe(
      catchError(this.errorHandler)
    );
  }

  getCountryBorderName(code: string): Observable<string> {
    const url = `${env.API}/alpha/${code}?fields=name`;

    return this.http.get<Country>(url).pipe(
      map(res => res.name.common),
      catchError(this.errorHandler)
    );
  }

  searchCountries(query: SrchQuery ): Observable<CountrySrchResult[]> {
    const url = ((query?.name) 
      ? `${env.API}/name/${query.name}`
      : (query?.code)
      ? `${env.API}/alpha/${query.code}`
      : (query?.region)
      ? `${env.API}/region/${query.region}`
      : `${env.API}/all`) + '?fields=name,region,capital,population,flags,cca2';

    return this.http.get<CountrySrchResult[]>(url).pipe(
      catchError(this.errorHandler)
    );
  }
  
  private errorHandler(error: HttpErrorResponse): Observable<never> {
   return throwError(error);
  }
}
