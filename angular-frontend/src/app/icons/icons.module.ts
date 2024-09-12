import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { Upload, Sun, PlusSquare, Book } from 'angular-feather/icons';

const icons = { Upload, Sun, PlusSquare, Book };

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
