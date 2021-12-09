import { Component, Input, OnInit, EventEmitter, HostListener, Output } from '@angular/core';
import { REGIONS } from '../config/regions.config';

@Component({
  selector: 'flag-region-filter-menu',
  templateUrl: './region-filter-menu.component.html',
  styleUrls: ['./region-filter-menu.component.scss']
})
export class RegionFilterMenuComponent implements OnInit {
  @Input() darkModeActive = false;
  @Input() selectedOption!: string;
  @Output() filterChanged = new EventEmitter<string>();
  showFilterList = false;
  regions = REGIONS;

  constructor() { }

  ngOnInit(): void {
  }

  private onfilterChanged(region: string): void {
    if (region === this.selectedOption) return;
    
    this.filterChanged.emit(region);
    this.showFilterList = false;
  }

  onFilterClicked(e: MouseEvent, region: string): void {
    e.stopImmediatePropagation();
    this.onfilterChanged(region); 
  }

  onFilterEnterKeyPressed(e: KeyboardEvent, region: string): void {
    if (!this.showFilterList || e.key !== 'Enter') return;
    this.onfilterChanged(region); 
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

}
