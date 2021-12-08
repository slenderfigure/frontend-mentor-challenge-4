import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Country } from '../models/country.model';
import { CountryService } from './country.service';
import { GlobalLoaderService } from './global-loader.service';

@Injectable({
  providedIn: 'root'
})
export class CountryDetailsResolver implements Resolve<Country> {
  constructor(
    private countryService: CountryService,
    private loader: GlobalLoaderService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const code = <string>route.paramMap.get('code');
    let _details!: Country;

    this.loader.showProgressbar();
    return this.countryService.getCountryDetails(code).pipe(
      map(details => {
        _details = details;
        
        const bordersObservables = details.borders.map(border => {
          return this.countryService.getCountryBorderName(border);
        });

        return bordersObservables.length
          ? bordersObservables
          : of(null);
      }),
      switchMap(requests => forkJoin(requests)),
      map(borderNames => {
        _details.borders = !(_details.borders.length) ? [] : borderNames;
        return _details;
      }),
      tap(() => this.loader.hideProgressbar()),
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
