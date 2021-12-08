import { Component, Input, OnInit } from '@angular/core';
import { CountrySrchResult } from 'src/app/common/models/country-srch.model';

@Component({
  selector: 'flag-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss']
})
export class CountryCardComponent implements OnInit {
  @Input() country!: CountrySrchResult;
  @Input() darkModeActive = false;
  loaded = false;

  constructor() { }

  ngOnInit(): void {
  }
  
}
