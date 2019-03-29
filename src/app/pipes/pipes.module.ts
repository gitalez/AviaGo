import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NgMathPipesModule } from 'angular-pipes';
import { FloorPipe } from 'angular-pipes';

import { TimeDifferencePipe } from './time-difference.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    NgMathPipesModule
  ],
  declarations: [
    TimeDifferencePipe,
    TimeAgoPipe,
    ImageSanitizerPipe,
    DomSanitizerPipe
  ],
  exports: [
    ImageSanitizerPipe,
    DomSanitizerPipe,
    FloorPipe,
    TimeDifferencePipe,
    TimeAgoPipe
  ],
  entryComponents: [],
})
export class PipesModule {}
