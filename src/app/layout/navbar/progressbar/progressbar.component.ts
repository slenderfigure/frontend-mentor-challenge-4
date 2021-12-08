import { Component, OnInit } from '@angular/core';
import { GlobalLoaderService } from 'src/app/common/services/global-loader.service';

@Component({
  selector: 'flag-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
})
export class ProgressbarComponent implements OnInit {
  showProgressbar = false;

  constructor(private loaderService: GlobalLoaderService) { }

  ngOnInit(): void {
    this.loaderService.progressbar$.subscribe(state => {
      this.showProgressbar = state;
    });
  }

}