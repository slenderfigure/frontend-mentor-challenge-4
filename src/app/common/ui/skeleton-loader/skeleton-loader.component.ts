import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'flag-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss']
})
export class SkeletonLoaderComponent implements OnInit {
  @Input() showLoader = false;
  @Input() darkModeActive = false;
  @Input() totalLoadingItems = 0;
  skeletonItems: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.skeletonItems = [...Array(this.totalLoadingItems).keys()];
  }

}
