import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryDetailsResolver } from './common/services/country-details.resolver';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';

const routes: Routes = [
  { path: 'home', component: LandingpageComponent },
  { 
    path: 'country-details/:code', 
    component: CountryDetailsComponent,
    resolve: { details: CountryDetailsResolver }
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
