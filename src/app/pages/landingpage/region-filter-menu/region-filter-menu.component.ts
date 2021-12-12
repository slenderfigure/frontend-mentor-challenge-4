import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  HostListener,
  Output,
  ViewChildren,
  QueryList,
  ElementRef
} from '@angular/core';
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
  @ViewChildren('filterListItem') filterListItems!: QueryList<ElementRef<HTMLElement>>;
  showFilterList = false;
  regions = REGIONS;
  listIndex = -1;

  constructor() { }

  ngOnInit(): void {
  }

  private resetState(): void {
    this.showFilterList = false;
    this.listIndex = -1;
  }

  private onfilterChanged(region: string): void {
    if (region === this.selectedOption) return;
    
    this.filterChanged.emit(region);
    this.resetState();
  }

  onFilterClicked(e: MouseEvent, region: string): void {
    e.stopImmediatePropagation();
    this.onfilterChanged(region); 
  }

  onFilterEnterKeyPressed(e: KeyboardEvent, region: string): void {
    if (!this.showFilterList || (e.key !== 'Enter')) return;
    this.onfilterChanged(region); 
  }

  @HostListener('window:click', ['$event'])
  clickedOutside(e: MouseEvent): void {
    if (!this.showFilterList) return;

    const target = <HTMLElement>e.target;

    if (!target.closest('.filter-menu')) this.resetState();
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (!this.showFilterList) return;

    e.preventDefault();
    
    switch (e.key) {
      case 'Escape':
        this.resetState();
        break;    
      case 'ArrowDown':
        (this.listIndex < this.regions.length - 1) ? ++this.listIndex : null;        
        break;      
      case 'ArrowUp':
        (this.listIndex > 0) ? --this.listIndex : null;
        break;    
      default:
        return;
    }   
    this.filterListItems.toArray()[this.listIndex]?.nativeElement.focus();
  }

}
