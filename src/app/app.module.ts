import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { CountryCardComponent } from './pages/landingpage/country-card/country-card.component';
import { SharedModule } from './shared/shared.module';
import { ProgressbarComponent } from './layout/navbar/progressbar/progressbar.component';
import { RegionFilterMenuComponent } from './pages/landingpage/region-filter-menu/region-filter-menu.component';
import { SearchFormComponent } from './pages/landingpage/search-form/search-form.component';
import { SkeletonLoaderComponent } from './common/ui/skeleton-loader/skeleton-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    CountryDetailsComponent,
    NavbarComponent,
    ProgressbarComponent,
    CountryCardComponent,
    RegionFilterMenuComponent,
    SearchFormComponent,
    SkeletonLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
