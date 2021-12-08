import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmoothImageLoadingDirective } from './smooth-image-loader/smooth-image-loader';


@NgModule({
  declarations: [
    SmoothImageLoadingDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SmoothImageLoadingDirective
  ]
})
export class SharedModule { }
